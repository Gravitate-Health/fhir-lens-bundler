export class Parameter {
    use: string;
    
    documentation: string;

    type: string;

    constructor(use: string, documentation: string, type: string) {
        this.use = use;
        this.documentation = documentation;
        this.type = type;
    }

    public static defaultValues(): Parameter {
        return new Parameter("in", "parameter if it exists", "CodeableConcept");
    }
}