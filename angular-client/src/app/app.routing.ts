import { UsersComponent } from "./users/users.component";
import { CreateComponent } from "./create/create.component";

export const AvailableRoutes: any = [
    { path: "", component: UsersComponent },
    { path: "create", component: CreateComponent }
];