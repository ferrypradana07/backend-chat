try {
    const socket = io("https://45yk5k-7575.csb.app",);
    // const socket = io('friendly-woolen-muse')
    const userId = Math.random();
    const button = document.getElementById("send_message");
    const message_container =
        document.getElementsByClassName("message-container")[0];
    const input_element = document.getElementById("text_content");
    const body = document.getElementsByClassName("main-web")[0];
    input_element.addEventListener("keydown", function () {
        if (event.keyCode == 13) {
            send_message();
        }
    });

    button.addEventListener("click", function () {
        send_message();
    });
    
    function send_message() {
        const date = new Date();
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        const text_message = {
            text: input_element.value,
            user: userId,
            time: `${hour}:${minute}`,
        };
        body.scrollTo(0, body.scrollHeight);
        if (input_element.value) {
            input_element.value = "";
            socket.emit("send_message", text_message);
        }
    }

    socket.on("send_message", (message) => {
        const hours = new Date();
        if (message.user == userId) {
            message_container.innerHTML += `<div class="message-area-right">
                                                <div class="message-box">
                                                    <pre class="message">${message.text}</pre>
                                                    <span class="message-time">${message.time}</span>
                                                </div>
                                            </div>`;
        } else {
            message_container.innerHTML += ` <div class="message-area-left">
                                                                            <div class="message-box">
                                                                                <pre class="message">${message.text}</pre>
                                                                                <span class="message-time">${message.time}</span>
                                                                            </div>
                                                                        </div>`;
        }
    });
} catch (error) {
    console.log(error)
    alert(error)
}