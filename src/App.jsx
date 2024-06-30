import axios from "axios";
import { useEffect, useState } from "react"

const App = () => {

  const [image, setimage] = useState([]);
  const [page, setpage] = useState(1)

  const getImage = async () => {
    try {
      const { data } = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      setimage(data);
    } catch (error) {
      console.log(error);
    }
  }

  let renderImage = "Loading"
  if (image.length > 0) {
    renderImage = image.map((img) =>
      <div className="w-72 h-52 mb-10" key={img.id}>
        <img className="w-full h-full rounded object-cover" src={img.download_url} alt="" />
        <h1 className="text-center">{img.author}</h1>
      </div>
    )
  }


  useEffect(() => {
    getImage()
  }, [page])

  return (
    <div className="w-full h-screen flex items-center justify-center gap-2 flex-wrap px-10 py-10">
      {renderImage}
      <div className="w-full h-20 flex gap-4 items-center justify-center">
        <button onClick={() => { if (page > 1) { setpage(page - 1) } }} className="px-6 py-1 bg-blue-600 rounded">Prev</button>
        <button onClick={() => setpage(page + 1)} className="px-6 py-1 bg-zinc-500 rounded">Next</button>
      </div>
    </div>
  )
}

export default App