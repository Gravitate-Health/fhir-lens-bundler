import { Contact } from "./contact.js";
import { Content } from "./content.js";
import { Extension } from "./extension.js";
import { Identifier } from "./identifier.js";
import { Jurisdiction } from "./jurisdiction.js";
import { Meta } from "./meta.js";
import { Parameter } from "./parameter.js";
import { Type } from "./type.js"; // Add this import statement

export class LensFhirResource {
    resourceType: string;

    id: string;

    meta: Meta;

    extension: Extension[];

    url: string;

    identifier: Identifier[];

    version: string;

    name: string;

    date: string;

    title: string;

    status: string;

    experimental: boolean;

    type: Type;

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
    private constructor(resourceType: string, meta: Meta, extension: Extension[], url: string, identifier: Identifier[], version: string, name: string, title: string, status: string, experimental: boolean, type: Type, publisher: string, contact: Contact[], description: string, jurisdiction: Jurisdiction[], purpose: string, usage: string, copyright: string, parameter: Parameter[], content: Content[]) {
        this.resourceType = resourceType;
        this.id = name.toLowerCase().replaceAll(/\s+/g, '-');
        this.date = new Date().toISOString();
        this.meta = meta;
        this.extension = extension;
        this.url = url;
        this.identifier = identifier;
        this.version = version;
        this.name = name;
        this.title = title;
        this.status = status;
        this.experimental = experimental;
        this.type = type;
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
    // ...

        static defaultValues(name: string, lens: string): LensFhirResource {
            return new LensFhirResource(
                "Library",
                new Meta(),
                [Extension.defaultValues()],
                "http://hl7.eu/fhir/ig/gravitate-health/Library/mock-lib",
                [new Identifier("http://gravitate-health.lst.tfo.upm.es", name)],
                "0.0.1",
                name,
                name,
                "draft",
                true,
                Type.defaultValues(),
                "Gravitate Health Project - UPM Team",
                [Contact.defaultValues()], // Add the missing Contact parameter
                "Description to be specified",
                [Jurisdiction.defaultValues()],
                "Purpose yo be specified",
                "Usage to be specified",
                "© 2024 Gravitate Health",
                [Parameter.defaultValues()],
                [new Content('application/javascript', lens)]
            );
        }

        // eslint-disable-next-line max-params
        static interactiveValues(name: string, description: string, purpose: string, usage: string, lens: string): LensFhirResource {
            return new LensFhirResource(
                "Library",
                new Meta(),
                [Extension.defaultValues()],
                "http://hl7.eu/fhir/ig/gravitate-health/Library/mock-lib",
                [new Identifier("http://gravitate-health.lst.tfo.upm.es", name)],
                "0.0.1",
                name,
                name,
                "draft",
                true,
                Type.defaultValues(),
                "Gravitate Health Project - UPM Team",
                [Contact.defaultValues()], // Add the missing Contact parameter
                description,
                [Jurisdiction.defaultValues()],
                purpose,
                usage,
                "© 2024 Gravitate Health",
                [Parameter.defaultValues()],
                [new Content('application/javascript', lens)]
            )
        }
}