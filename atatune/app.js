
/**
 * See example here:
 * https://www.geeksforgeeks.org/how-to-record-and-play-audio-in-javascript/
 */

const main = () => {
    const btn = document.getElementById('recorder');
    btn.addEventListener('click', () => {

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((res) => {
                console.log(res)
            })
    })
}

window.addEventListener('load', main)