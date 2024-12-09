export const getSingleChapter = async (chapterId:number) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}+`)
    }catch(error){
        if(error instanceof Error){
            console.error(`Error obteniendo la información del capítulos ${error.message}`)
        }
        console.error("Error inesperado cargando el capitulo")
    }
}