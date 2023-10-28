import Clock from './deps/clock.js';
import View from './view.js';

const view = new View()
const clock = new Clock()

const worker = new Worker('./src/worker/worker.js', {
    type: 'module'
})

worker.onerror = (error) => {
    console.log('error worker', error)
}

worker.onmessage = ({ data }) => {
    if(data.status !== 'done') return;
    clock.stop()
    view.updateElapsedTime(`Process took ${took.replace('ago', '')}`)
}


let took = ''

view.configureOnFileChange(file => {
    const canvas = view.getCanvas()
    worker.postMessage({
        file,
        canvas
    }, [
        canvas
    ])

    clock.start((time) => {
        took = time;
        view.updateElapsedTime(`Process started ${time}`)
    })
 
})


async function fakeFetch() {
    const filePath = '/videos/frag_bunny.mp4'
    const response = await fetch(filePath)

    //recupera o tamanho do arquivo em bytes
    // const response = await fetch(filePath, {
    //     method: "HEAD"
    // })

    //Invoca a função de depuração do navegador
    //debugger

    const file = new File([await response.blob()] , 
        filePath, 
        {   
            typeof: 'video/mp4', 
            lastModified: Date.now()
        } 
    )

    const event = new Event('change')

    Reflect.defineProperty(
        event,
        'target',
        {value: {files: [file]}}
    )

    document.getElementById('fileUpload').dispatchEvent(event)
}


fakeFetch()