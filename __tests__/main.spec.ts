import { ref, toRefs } from 'vue-demi'
import { toRefsValue, toRefReactive, toRefsReactive } from "../src/main";
import {expect} from "vitest";


interface ObjRef {
	name: string
	age: number
	sex?: string
}
describe('Test utils', () => {
	it('toRefReactive', () => {

		const objRef = ref<ObjRef>({
			name: 'wang',
			age: 12
		})
		const name = toRefReactive(objRef, 'name')
		expect(name.value).toBe('wang')
		name.value = '1'
		expect(objRef.value.name ).toBe('1')
		objRef.value = {name: 'xxx', age: 13}
		expect(name.value).toBe('xxx')

		// If objRef doesn't have this key in the first place
		const sex = toRefReactive(objRef, 'sex', 'boy')
		expect(sex.value).toBe('boy')
		objRef.value.sex = 'girl'
		// or
		objRef.value = { name: 'l', age: 16, sex: 'girl' }
		expect(sex.value).toBe('girl')
	})

	it('toRefsReactive', () => {
		const objRef = ref<ObjRef>({
			name: 'wang',
			age: 12
		})
		const obj = toRefsReactive(objRef)
		expect(obj.name).toBe('wang')
		obj.name = '1'
		expect(objRef.value.name).toBe('1')

		// However, this time give objRef.value a new value. Causes obj and objRef to lose contact
		objRef.value = { name: 'hao', age: 26, sex: 'boy' }
		expect(obj.sex).toBeUndefined()
		// Therefore, toRefsReactive is generally not recommended to use alone

		// Correct usage
		const { name, age } = toRefs(toRefsReactive(objRef))
		expect(name.value).toBe('hao')
		expect(age.value).toBe(26)
		age.value++
		expect(objRef.value.age).toBe(27)

		objRef.value = { name: 'new', age: 18 }
		expect(name.value).toBe('new')
		expect(age.value).toBe(18)
	})

	it('toRefsValue', () => {
		const objRef = ref<ObjRef>({
			name: 'wang',
			age: 12
		})
		const { name, age } = toRefsValue(objRef)
		expect(name.value).toBe('wang')
		objRef.value = { name: 'hao', age: 26 }
		expect(name.value).toBe('hao')
		expect(age.value).toBe(26)
	})
})
