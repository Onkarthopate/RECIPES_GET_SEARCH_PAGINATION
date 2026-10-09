import React, { useEffect, useState } from 'react'

const TodoExample = () => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");

    useEffect(() => {

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/recipes?search=${search}` , {
                    signal : controller.signal,
                });
                const result = await res.json();
                setData(result.recipes || [])

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        return ()=> controller.abort();

    },[search])

    useEffect(()=>{
        const timer = setTimeout(() => {
            setDebounceSearch(search);
        }, 900);

        return ()=> clearTimeout(timer);
    },[search])

    const searchData = data.filter((i) => {
        const name = i.name.toLowerCase().trim();

        return name.includes(debounceSearch.toLowerCase());
    });

    return (

        <>

            <input type="search" name="" id="" placeholder='Search By Recipes name' style={{ margin: "10px", padding: "6px", display: 'flex', justifySelf: 'flex-end' }}
                value={search} onChange={(e) => setSearch(e.target.value)} />

            <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", alignItems: "stretch" }}>

                {
                    searchData.length > 0 ? searchData.map((n) => {
                        console.log(n);

                        const ingredients = n.ingredients.join(",");
                        console.log(ingredients);

                        return (
                            <div key={n.id} style={{ display: "grid", border: "1px solid gray", minHeight: "390px", background: "#fdf5f5", padding: "10px" }}>
                                <h3 style={{ textAlign: "center" }}>Recipes Name :{n.name}</h3>
                                <img src={n.image} alt={n.image} style={{ objectFit: "cover", height: "200px", width: "200px", borderRadius: "10px", margin: "0 auto" }} />
                                <p><b>Ingredients</b> : {ingredients}</p>
                                <p>Rating : {n.rating}</p>
                                <p>Difficulty : {n.difficulty}</p>

                            </div>
                        )
                    }) : <p style={{ margin: "0 auto" }}>No Record Found</p>
                }
            </div>

        </>

    )
}



export default TodoExample