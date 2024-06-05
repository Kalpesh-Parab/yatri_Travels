import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    "title": {
      "type": "string",
      "required": true
    },
    "duration": {
      "type": "string",
      "required": true
    },
        "photos": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "url"
      },
      "required": true
    },
    "igphotos": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "url"
      },
      "required": true
    },
    "daytitle": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "required": true
    },
    "daydesc": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "required": true
    },
    "catchphrase": {
      "type": "string",
      "required": true
    },
    "packagedesc": {
      "type": "string",
      "required": true
    },
    "price": {
      "type": "number",
      "required": true
    },
    "igpost": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "url"
      },
      "required": true
    },
    "mainPackage": {
      "type": "boolean",
      "required": true
    },
    "destinationName": {
      "type": "string",
      "required": true
    },
    "packageType": {
      "type": "string",
      "required": true
    },
    "titleDesc":{
      "type": "string",
      "required": true
    }
  });

export default mongoose.model("Package",PackageSchema);