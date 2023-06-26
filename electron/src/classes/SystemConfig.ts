import { ErrorFactory, SuccessResultFactory } from "./Base";

export class SystemConfigErrorFactory extends ErrorFactory {}

export class SystemConfigSuccessResultFactory extends SuccessResultFactory {}

export const systemConfigErrorFactory = new SystemConfigErrorFactory();

export const systemConfigSuccessResultFactory =
    new SystemConfigSuccessResultFactory();
