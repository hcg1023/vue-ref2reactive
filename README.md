# vue-ref2reactive

## Using
```
npm install vue-ref2reactive
yarn add vue-ref2reactive
pnpm install vue-ref2reactive
```

## Problem solved

```ts
import {ref, toRefs} from 'vue'
import { toRefReactive, toRefsReactive, toRefsValue } from "vue-ref2reactive";

const objRef = ref({
	name: 'wang',
	age: 12
})

const {name, age} = toRefs(objRef.value)

objRef.value = {name: 'xxx', age: 13}
//now objRef.value.name !== name.value
```


## Example
### toRefReactive
```ts
import { ref } from 'vue'
import { toRefReactive } from "vue-ref2reactive";

const objRef = ref({
	name: 'wang',
	age: 12
})
const name = toRefReactive(objRef, 'name')
name.value // wang
name.value = '1'
objRef.value.name // '1'
objRef.value = {name: 'xxx', age: 13}
// name.value === 'xxx'

// If objRef doesn't have this key in the first place
const sex = toRefReactive(objRef, 'sex', 'boy')
sex.value // boy
objRef.value.sex = 'girl'
// or
objRef.value = { name: 'l', age: 16, sex: 'girl' }
sex.value // girl
```
### toRefsReactive

```ts
import { ref, toRefs } from 'vue'
import { toRefsReactive, toRefReactive } from "vue-ref2reactive";

const objRef = ref({
	name: 'wang',
	age: 12
})
const obj = toRefsReactive(objRef)
obj.name // wang
obj.name = '1'
objRef.value.name // '1'

const { name, age } = toRefs(toRefsReactive(objRef))
const sex = toRefReactive(objRef, 'sex')
sex.value // undefined
name.value // 'hao'
age.value // 26
age.value++
objRef.value.age // 27

objRef.value = { name: 'new', age: 18, sex: 'boy' }
name.value // 'new'
age.value // 18
sex.value // 'boy'
```
### toRefsValue
```ts
import { ref } from 'vue'
import { toRefsValue } from "vue-ref2reactive";

const objRef = ref({
	name: 'wang',
	age: 12
})
const { name, age } = toRefsValue(objRef)
name.value // 'wang'
objRef.value = { name: 'hao', age: 26 }
name.value // 'hao'
age.value // 26
```
