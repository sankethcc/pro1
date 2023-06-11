import mobile from '../assets/mobile.png'
import laptop from '../assets/laptop.png'
import speaker from '../assets/speaker.png'
import headphone from '../assets/earphone.png'
import mouse from '../assets/mouse.png'
import tablet from '../assets/tablet.png'
import pods from '../assets/pods.png'
import watch from '../assets/watch.png'
import camera from '../assets/camera.png'



import Icon from './Icon'
export default function NavigationBar2(){

    return(
        <>
            <div className='nav2-container'>
                <Icon icon={mobile} name ="Mobile"/>
                <Icon icon={tablet} name ="Tablets"/>
                <Icon icon={laptop} name ="Laptop"/>
                <Icon icon={speaker} name ="Speaker"/>
                <Icon icon={pods} name ="Pods"/>
                <Icon icon={headphone} name ="Headphones"/>
                <Icon icon={mouse} name ="Mouse"/>
                <Icon icon={watch} name ="Watch"/>
                <Icon icon={camera} name ="Camera"/>
            </div>
        </>
    )
}