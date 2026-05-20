import { useParams } from "react-router-dom";
export default function MovieDetails()
{
    const {id} = useParams();
    return(
         <div className="text-white p-10">

      <h1 className="text-5xl font-bold">
        Movie ID: {id}
      </h1>

    </div>
    )
}
