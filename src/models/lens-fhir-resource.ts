import { Contact } from "./contact.js";
import { Content } from "./content.js";
import { Extension } from "./extension.js";
import { Identifier } from "./identifier.js";
import { Jurisdiction } from "./jurisdiction.js";
import { Meta } from "./meta.js";
import { Parameter } from "./parameter.js";
import { TextResource } from "./text-resource.js";
import { Type } from "./type.js";

export class LensFhirResource {
    resourceType: string;

    id: string;

    meta: Meta;

    text: TextResource;

    extension: Extension[];

    url: string;

    identifier: Identifier[];

    version: string;

    name: string;

    title: string;

    status: string;

    experimental: boolean;

    type: Type;

    date: string;

    publisher: string;

    contact: Contact[];

    description: string;

    jurisdiction: Jurisdiction[];

    purpose: string;

    usage: string;

    copyright: string;

    parameter: Parameter[];

    content: Content[];

    // eslint-disable-next-line max-params
    private constructor(resourceType: string, id: string, meta: Meta, text: TextResource, extension: Extension[], url: string, identifier: Identifier[], version: string, name: string, title: string, status: string, experimental: boolean, type: Type, date: string, publisher: string, contact: Contact[], description: string, jurisdiction: Jurisdiction[], purpose: string, usage: string, copyright: string, parameter: Parameter[], content: Content[]) {
        this.resourceType = resourceType;
        this.id = id;
        this.meta = meta;
        this.text = text;
        this.extension = extension;
        this.url = url;
        this.identifier = identifier;
        this.version = version;
        this.name = name;
        this.title = title;
        this.status = status;
        this.experimental = experimental;
        this.type = type;
        this.date = date;
        this.publisher = publisher;
        this.contact = contact;
        this.description = description;
        this.jurisdiction = jurisdiction;
        this.purpose = purpose;
        this.usage = usage;
        this.copyright = copyright;
        this.parameter = parameter;
        this.content = content;
    }

    static newEmptyLens(): LensFhirResource {
        return new LensFhirResource(
            "",
            "",
            new Meta(),
            TextResource.defaultValues(),
            [],
            "",
            [],
            "",
            "",
            "",
            "",
            false,
            Type.defaultValues(),
            "",
            "",
            [],
            "",
            [],
            "",
            "",
            "",
            [],
            []
        );
    }

    
}