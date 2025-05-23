import mongoose from " mongoose" ;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
{
    videoFile : {
        type :  String ,//cloudnaryurl
        required : true , 

    },
    thumbnail : {
        type: String, //cloudnaryurl
        required : true,
    },
    title : {
        type : String , 
        required : true ,
    },
    description : {
        type : String,
        required :true ,

    },
    duration : {
        type : Number, //cloudnaryurl


    },
    views : {
        type : Number ,
        default : 0,
    },
    isPublished  : {
        type : Boolean,
        default : true,
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }




}, {timestamps : true})

videoSchema.plugin(mongooseAggregatePaginate)  // queries likhne ke liye aggregate ko import kiya


export const Video = mongoose.model("Video", videoSchema)