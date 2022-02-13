
export const log = (c1: string, c2: string) => console.log.bind(window.console, '%c%s',
    `color: ${c1}; background: ${c2}; font-size: 10px; border-radius: 2px; font-weight: bold; padding: 2px`)
export const logi = log('#284271', '#a8e9ff')
export const logw = log('#7c4400', '#ffd06f')
export const loge = log('#be0000', '#ffcaca')

export async function logImage(url) {
    if (!url)
        return
    return new Promise<void>(r => {
        const img = new Image();
        img.onload = function () {
            const style = "font-size: 1px; padding: " + Math.floor(img.height / 2) + "px " + Math.floor(img.width / 2) + "px; ";
            console.log("%c+", style + "background: url(" + url + "); background-size: " + (img.width) + "px " + (img.height) + "px; color: transparent;");
            r()
        };
        img.onerror = _ => r()
        img.src = url;
    })
}
