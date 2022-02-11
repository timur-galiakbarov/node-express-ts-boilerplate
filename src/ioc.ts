import { createContainer, AwilixContainer, InjectionMode, asClass } from "awilix";

import AppController from "./App/AppController";

export interface ICradle {
    achievementsHistoryController: AppController
}

const container: AwilixContainer = createContainer<ICradle>({
    injectionMode: InjectionMode.PROXY
});

container.register({
    appController: asClass(AppController),
});

export default container;
