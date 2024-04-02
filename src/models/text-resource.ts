export class TextResource {
    status: string;
    div: string;
  
    constructor(status: string, div: string) {
        this.status = status;
        this.div = div;
    }
  
    public static defaultValues(): TextResource {
        return new TextResource("generated", "<div xmlns=\"http://www.w3.org/1999/xhtml\">Gravitate Health</div>"); // TO-DO: Revise to adapt to the real version 
    }
}