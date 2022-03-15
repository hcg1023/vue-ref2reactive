import { isRef, reactive, Ref, ToRef, toRefs, ToRefs } from 'vue-demi'

class ReactiveRefObjectImpl<T extends object, K extends keyof T> {
	public __v_isRef = true

	constructor(
		private readonly _object: Ref<T>,
		private readonly _key: K,
		private readonly _defaultValue?: T[K]
	) {}

	get value() {
		const val = this._object.value[this._key]
		return val === undefined ? (this._defaultValue as T[K]) : val
	}

	set value(newVal) {
		this._object.value[this._key] = newVal
	}
}

export function toRefReactive<T extends object, K extends keyof T>(
	object: Ref<T>,
	key: K,
	defaultValue?: T[K]
): ToRef<T[K]> {
	const val = object.value[key]
	return isRef(val)
		? val
		: (new ReactiveRefObjectImpl(object, key, defaultValue) as any)
}

export function toRefsReactive<T extends object>(ref: Ref<T>): T {
	const ret: any = reactive(Array.isArray(ref.value) ? [] : {})

	for (const key in ref.value) {
		ret[key] = toRefReactive(ref, key as keyof T)
	}

	return ret as T
}

export function toRefsValue<T extends object>(ref: Ref<T>): ToRefs<T> {
	return toRefs(toRefsReactive(ref))
}
