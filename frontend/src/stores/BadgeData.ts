import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IBadge {
    icon: IconProp,
    description: string,
    count: string | number
}

export default class Badge implements IBadge {
    icon: IconProp;
    description: string;
    count: string | number;
    constructor(icon: IconProp, description: string, count: string | number) {
        this.icon = icon;
        this.description = description;
        this.count = count;
    }
}