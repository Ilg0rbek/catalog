import dotenv from "dotenv";

dotenv.config();

export default class VK {
  init() {
    const Window = (window)
    if (Window.vkDidInit) {
      return false
    }
    Window.vkDidInit = true
    const script = document.createElement('script')
    script.async = true
    script.src = `//vk.com/js/api/openapi.js?168`
    document.head.appendChild(script)
    script.onload = () => {
      window.VK.init({
        apiId: process.env.REACT_APP_VK_APP
      })
    }
  }
}