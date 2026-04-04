const noopClassDecorator: ClassDecorator = () => undefined
const noopMethodDecorator: MethodDecorator = () => undefined
const noopParameterDecorator: ParameterDecorator = () => undefined
const noopClassMethodDecorator = noopMethodDecorator as ClassDecorator & MethodDecorator
const noopHiddenDecorator = noopParameterDecorator as ClassDecorator & MethodDecorator & ParameterDecorator

export const createNoopClassDecorator = (_kind: string): ClassDecorator => noopClassDecorator

export const createNoopMethodDecorator = (_kind: string): MethodDecorator => noopMethodDecorator

export const createNoopParameterDecorator = (_kind: string): ParameterDecorator => noopParameterDecorator

export const createNoopClassMethodDecorator = (_kind: string): ClassDecorator & MethodDecorator => noopClassMethodDecorator

export const createNoopHiddenDecorator = (_kind: string): ClassDecorator & MethodDecorator & ParameterDecorator => noopHiddenDecorator
