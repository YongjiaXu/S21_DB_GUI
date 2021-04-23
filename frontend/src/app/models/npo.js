export class Npo {
    constructor(npoID, title, location, logoUrl, description, isApproved){
        this.description = description;
        this.npoID =npoID;
        this.title = title;
        this.isApproved = isApproved;
        this.location = location;
        this.logoUrl = logoUrl;
    }
}