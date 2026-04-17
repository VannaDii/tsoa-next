const noopClassDecorator: ClassDecorator = () => undefined
const noopMethodDecorator: MethodDecorator = () => undefined
const noopParameterDecorator: ParameterDecorator = () => undefined
const noopClassMethodDecorator = noopMethodDecorator as ClassDecorator & MethodDecorator
const noopHiddenDecorator = noopParameterDecorator as ClassDecorator & MethodDecorator & ParameterDecorator

export const createNoopClassDecorator = (kind: string): ClassDecorator => noopClassDecorator

export const createNoopMethodDecorator = (kind: string): MethodDecorator => noopMethodDecorator

export const createNoopParameterDecorator = (kind: string): ParameterDecorator => noopParameterDecorator

export const createNoopClassMethodDecorator = (kind: string): ClassDecorator & MethodDecorator => noopClassMethodDecorator

export const createNoopHiddenDecorator = (kind: string): ClassDecorator & MethodDecorator & ParameterDecorator => noopHiddenDecorator
