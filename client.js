(() => {
    var isChatWindowOpen = false
    // these variables are declear due to identification of multiple cards in a DOM
    var genericCard = 0,
        buttonCard = 0,
        listCardCount = 0,
        mediaCardCount = 0,
        receiptCardCount = 0,
        receiveTextMessageCount = 0;

    var iframe = document.createElement('IFRAME');
    iframe.setAttribute("class", "chat-window-container");
    iframe.setAttribute("id", "chat-window-container");
    document.body.appendChild(iframe);
    var body = ' \
        <div id="intercom-container"> \
        <div id="wrapper" class="intercom-messenger intercom-messenger-home-screen intercom-messenger-from-booting" onscroll="scrollMessangerBody()"> \
            <div class="intercom-messenger-header"> \
                <span> \
                    <div class="intercom-home-screen-header" id="messanger-header"> \
                        <div class="intercom-home-screen-header-body-container" style="transform: translateY(0px); opacity: 1;"> \
                            <div class="intercom-home-screen-header-body"> \
                                <div class="intercom-home-screen-header-logo"> \
                                    <button type="button" id="backToViewOneBtn" onclick="showViewOne()">back</button>\
                                    <img src="./logo.png" alt="Intercom logo"/> \
                                </div> \
                                <div class="intercom-fit-text" style="font-size: 30px; max-width: 296px;"> \
                                    <span class="intercom-home-screen-header-greeting">Hi,</span> \
                                </div> \
                                <span class="intercom-home-screen-header-intro">We heko your business grow by cconneccting you to your customers.</span> \
                            </div> \
                        </div> \
                    </div> \
                </span> \
            </div> \
            <div class="intercom-messenger-body" id="intercom-messenger-body-id"></div> \
            <div class="intercom-messenger-body" id="messenger-body-view-2-id"></div> \
            <div class="intercom-footer" id="intercom-footer-id"> \
                <div class="message-text-field-wrapper"> \
                    <textarea id="message-text-field" placeholder="Send a message…"  onkeypress="onSendMessage();" onfocus="focusInMsgField();" onblur="focusOutMsgField()"></textarea> \
                </div> \
                <div class="intercom-composer-buttons"> \
                    <button class="intercom-composer-gif-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="29px" height="20px" viewBox="0 0 439.875 439.875" style="enable-background:new 0 0 439.875 439.875;" xml:space="preserve"><g><g><path d="M76.5,191.25v57.375c0,21.037,17.212,38.25,38.25,38.25h57.375v-15.3V229.5v-19.125H114.75V229.5H153v38.25h-38.25    c-11.475,0-19.125-7.65-19.125-19.125V191.25c0-11.475,7.65-19.125,19.125-19.125h57.375V153H114.75    C93.712,153,76.5,170.212,76.5,191.25z" fill="#cccccc"/><polygon points="191.25,172.125 210.375,172.125 210.375,267.75 191.25,267.75 191.25,286.875 248.625,286.875 248.625,267.75     229.5,267.75 229.5,172.125 248.625,172.125 248.625,153 191.25,153   " fill="#cccccc"/><path d="M382.5,95.625H57.375C24.862,95.625,0,120.487,0,153v133.875c0,32.513,24.862,57.375,57.375,57.375H382.5    c32.513,0,57.375-24.862,57.375-57.375V153C439.875,120.487,415.013,95.625,382.5,95.625z M420.75,286.875    c0,21.037-17.213,38.25-38.25,38.25H57.375c-21.038,0-38.25-17.213-38.25-38.25V153c0-21.038,17.212-38.25,38.25-38.25H382.5    c21.037,0,38.25,17.212,38.25,38.25V286.875z" fill="#cccccc"/><polygon points="267.75,286.875 286.875,286.875 286.875,229.5 344.25,229.5 344.25,210.375 286.875,210.375 286.875,172.125     363.375,172.125 363.375,153 267.75,153   " fill="#cccccc"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>\
                    <button class="intercom-composer-emoji-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 295.996 295.996" style="enable-background:new 0 0 295.996 295.996;" xml:space="preserve" width="18px" height="18px"><g><path d="M147.998,0C66.392,0,0,66.392,0,147.998s66.392,147.998,147.998,147.998s147.998-66.392,147.998-147.998   S229.605,0,147.998,0z M147.998,279.996c-36.256,0-69.143-14.696-93.022-38.44c-9.536-9.482-17.631-20.41-23.934-32.42   C21.442,190.847,16,170.047,16,147.998C16,75.214,75.214,16,147.998,16c34.523,0,65.987,13.328,89.533,35.102   c12.208,11.288,22.289,24.844,29.558,39.996c8.27,17.239,12.907,36.538,12.907,56.9   C279.996,220.782,220.782,279.996,147.998,279.996z" fill="#cccccc"/><circle cx="99.666" cy="114.998" r="16" fill="#cccccc"/><circle cx="198.666" cy="114.998" r="16" fill="#cccccc"/><path d="M147.715,229.995c30.954,0,60.619-15.83,77.604-42.113l-13.439-8.684c-15.597,24.135-44.126,37.604-72.693,34.308   c-22.262-2.567-42.849-15.393-55.072-34.308l-13.438,8.684c14.79,22.889,39.716,38.409,66.676,41.519   C140.814,229.8,144.27,229.995,147.715,229.995z" fill="#cccccc"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>\
                    <button class="intercom-composer-upload-button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 482.8 482.8" style="enable-background:new 0 0 482.8 482.8;" xml:space="preserve" width="18px" height="18px"><g><g><path d="M255.2,209.3c-5.3,5.3-5.3,13.8,0,19.1c21.9,21.9,21.9,57.5,0,79.4l-115,115c-21.9,21.9-57.5,21.9-79.4,0l-17.3-17.3    c-21.9-21.9-21.9-57.5,0-79.4l115-115c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-115,115C8.7,322.7,0,343.6,0,365.8    c0,22.2,8.6,43.1,24.4,58.8l17.3,17.3c16.2,16.2,37.5,24.3,58.8,24.3s42.6-8.1,58.8-24.3l115-115c32.4-32.4,32.4-85.2,0-117.6    C269.1,204,260.5,204,255.2,209.3z" fill="#cccccc"/><path d="M458.5,58.2l-17.3-17.3c-32.4-32.4-85.2-32.4-117.6,0l-115,115c-32.4,32.4-32.4,85.2,0,117.6c5.3,5.3,13.8,5.3,19.1,0    s5.3-13.8,0-19.1c-21.9-21.9-21.9-57.5,0-79.4l115-115c21.9-21.9,57.5-21.9,79.4,0l17.3,17.3c21.9,21.9,21.9,57.5,0,79.4l-115,115    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l115-115c15.7-15.7,24.4-36.6,24.4-58.8    C482.8,94.8,474.2,73.9,458.5,58.2z" fill="#cccccc"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>\
                    <button onClick="onMouseSend();" class="intercom-composer-send-button" style="display:none"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 535.5 535.5" style="enable-background:new 0 0 535.5 535.5;" xml:space="preserve"><g><g id="send"><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75   " fill="#777777"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>\
                </div> \
            </div> \
        </div> \
    </div> \
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js" crossorigin="anonymous"></script>   \\\
    <script> \
        var socket = io.connect("localhost:3100"); \
        var wrapper = document.getElementById("wrapper"); \
        var messangerBodyView2 = document.getElementById("messenger-body-view-2-id");\
        var messangerBodyView1 = document.getElementById("intercom-messenger-body-id"); \
        var backToViewOneBtn = document.getElementById("backToViewOneBtn");\
        var view2Footer = document.getElementById("intercom-footer-id"); \
        var messangerHeader = document.getElementById("messanger-header"); \
        wrapper.style.marginBottom = "5px"; \
        messangerBodyView2.style.display = "none"; \
        view2Footer.style.display = "none"; \
        backToViewOneBtn.style.display = "none"; \
        socket.on("new message", (payload) => { \
            createDiv(messangerBodyView2, "textMessage-" + textMessageCount, "textMessage"); \
            var textMessageParent = document.getElementById("textMessage-" + textMessageCount); \
            textMessageParent.innerHTML = payload.msg; \
            textMessageCount++; \
        }) \
    </script> \
    <script> \
        var textMessageCount = 0; \
        function scrollMessangerBody(){ \
              /* document.getElementById("intercom-messenger-body-id").lastChild.style.marginBottom = "80px"; */ \
        } \
        function focusInMsgField (){ \
            document.getElementsByClassName("intercom-composer-upload-button")[0].style.display = "none"; \
            document.getElementsByClassName("intercom-composer-gif-button")[0].style.display = "none"; \
            document.getElementsByClassName("intercom-composer-send-button")[0].style.display = "initial"; \
        } \
        function focusOutMsgField (){ \
            document.getElementsByClassName("intercom-composer-upload-button")[0].style.display = "initial"; \
            document.getElementsByClassName("intercom-composer-gif-button")[0].style.display = "initial"; \
            document.getElementsByClassName("intercom-composer-send-button")[0].style.display = "initial"; \
        } \
       function onMouseSend(){\
            var text = document.getElementById("message-text-field").value; \
                document.getElementById("message-text-field").value = ""; \
                socket.emit("send message", text); \
                return false; \
       }\
        function onSendMessage() { \
            var key = window.event.keyCode; \
            if (key === 13) { \
                var text = document.getElementById("message-text-field").value; \
                document.getElementById("message-text-field").value = ""; \
                socket.emit("send message", text); \
                return false; \
            } \
            else { \
                return true; \
            } \
        } \
        function sendMessage(msg){ \
            socket.emit("send message", msg); \
            createDiv(messangerBodyView1, "textMessage-" + textMessageCount, "textMessage"); \
            var textMessageParent = document.getElementById("textMessage-" + textMessageCount); \
            textMessageParent.innerHTML = msg; \
            textMessageCount++; \
        } \
        function createDiv(parent, id, className) { \
            let div = createNode("DIV"); \
            div.id = id; \
            div.className = className; \
            return parent.appendChild(div); \
        } \
        function createNode(element) { \
            return document.createElement(element); \
        } \
        function showViewOne(){ \
            messangerBodyView1.style.display = "block"; \
            backToViewOneBtn.style.display = "none"; \
            messengerBodyView2.style.display = "none"; \
            messengerBodyView2.style.marginTop = "50px"; \
            view2Footer.style.display = "none"; \
            wrapper.style.marginBottom = "5px"; \
            messangerHeader.style.overflow = "hidden"; \
            messangerHeader.style.height = "220px"; \
        }\
      </script> \
    '

    iframe.contentWindow.document.write(body);
    // add socket.io script tag as CDN
    // var iframeSocketCDN = document.createElement("SCRIPT");
    // iframeSocketCDN.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js'
    // iframeSocketCDN.crossorigin = 'anonymous'
    // iframe.contentWindow.document.head.appendChild(iframeSocketCDN)

    // add css style sheet
    var iframeCssFile = document.createElement("LINK");
    iframeCssFile.rel = 'stylesheet';
    iframeCssFile.type = 'text/css';
    iframeCssFile.href = 'https://nonchalant-soprano.glitch.me/css';
    // iframeCssFile.href = 'index.css';
    iframeCssFile.media = 'all';
    iframe.contentWindow.document.head.appendChild(iframeCssFile)
    const idocument = iframe.contentWindow.document;

    // some javascript common function which are use in multiple times
    function createNode(element, id, className, innerHTML, parent) {
        let el = document.createElement(element)
        if (id) {
            el.id = id
        }
        if (className) {
            el.className = className
        }
        if (innerHTML) {
            el.innerHTML = innerHTML
        }
        if (parent) {
            append(parent, el)
        }
        return el; // Create the type of element you pass in the parameters
    }

    function append(parent, el) {
        return parent.appendChild(el); // Append the second parameter(element) to the first one
    }

    function createDiv(parent, id, className, style) {
        let div = createNode('DIV')
        if (id) {
            div.id = id;
        }
        if (className) {
            div.className = className;
        }
        if (style) {
            div = addStyles(div, style)
        }
        return parent.appendChild(div);
    }

    function addStyles(el, style) {
        for (var key in style) {
            el.style[key] = style[key]
        }
        return el
    }

    // Create generic card function
    function createGenericCard(card, divID) {
        let h5 = createNode('h5'), //  Create the elements we need
            p = createNode('p')
        h5.innerHTML = card.title;
        h5.className = 'generic-title';
        p.innerHTML = card.subtitle;
        p.className = 'generic-subtitle';
        let parent = iframe.contentWindow.document.getElementById(divID)
        append(parent, h5);
        append(parent, p);

        // Create Buttons Parent Div
        if (card.buttons) {
            let div = createNode('DIV')
            div.id = 'generic-buttons-' + genericCard
            div.className = 'generic-buttons'
            append(parent, div);
        }

        // create buttons
        card.buttons && card.buttons.map((button, i) => {
            let parent = iframe.contentWindow.document.getElementById('generic-buttons-' + genericCard)
            let btn = createNode('BUTTON')
            btn.title = button.title
            btn.innerHTML = button.title
            btn.className = 'btn-generic default-fullwidth-btn'
            btn.id = 'generic-btn-' + genericCard + '-' + i
            append(parent, btn);
        })
        genericCard++;
    }

    // Create button card function
    function createButtonCard(card, divID) {
        let p = createNode('p')
        p.innerHTML = card.text;
        p.className = 'button-card-title';
        let parent = iframe.contentWindow.document.getElementById(divID)
        append(parent, p);

        // Create Buttons Parent Div
        if (card.buttons) {
            let div = createNode('DIV')
            div.id = 'button-card-' + buttonCard
            div.className = 'generic-buttons'
            append(parent, div);
        }
        // create buttons
        card.buttons && card.buttons.map((button, i) => {
            let parent = iframe.contentWindow.document.getElementById('button-card-' + buttonCard)
            let btn = createNode('BUTTON')
            btn.title = button.title
            btn.innerHTML = button.title
            btn.className = 'button-card-btn default-fullwidth-btn'
            btn.id = 'button-card-btn-' + buttonCard + '-' + i
            append(parent, btn);
        })
        buttonCard++
    }

    // Create list card function
    function createListCard(card, divID) {
        let listCardContainer = iframe.contentWindow.document.getElementById(divID)
        switch (card.top_element_style) {
            case 'compact':
                createListItems();
                createBottomButtons();
                break;
        }

        function createListItems() {
            card.elements && card.elements.map((item, i) => {
                let listItemParentDiv = createNode('div')
                listItemParentDiv.id = 'list-item-' + i
                listItemParentDiv.className = 'list-item-container'
                append(listCardContainer, listItemParentDiv)

                // Create list container first child
                let listItemLeftDiv = createNode('DIV'),
                    listItemRightDiv = createNode('DIV')
                listItemLeftDiv.style.flex = 1
                listItemRightDiv.justifyContent = 'end'
                append(listItemParentDiv, listItemLeftDiv)
                append(listItemParentDiv, listItemRightDiv)

                // Create each list item childs inside parent div
                let ItemTitle = createNode('P'),
                    ItemSubtitle = createNode('P'),
                    ItemImage = createNode('IMG')

                ItemTitle.innerHTML = item.title;
                ItemTitle.className = 'item-title';
                ItemSubtitle.innerHTML = item.subtitle;
                ItemSubtitle.className = 'item-subtitle';
                append(listItemLeftDiv, ItemTitle)
                append(listItemLeftDiv, ItemSubtitle)

                item.buttons && item.buttons.map((btn, i) => {
                    let button = createNode('BUTTON')
                    button.className = 'list-item-button'
                    button.title = btn.title
                    button.type = btn.type
                    button.innerHTML = btn.title
                    button.onclick = () => {
                        window.location = btn.url
                    };
                    button.id = 'list-item-button-' + i
                    append(listItemLeftDiv, button)
                })

                if (item.image_url) {
                    ItemImage.src = item.image_url
                    ItemImage.height = 80
                    ItemImage.width = 80
                    ItemImage.style.borderRadius = '10px'
                    ItemImage.className = 'item-img'
                    append(listItemRightDiv, ItemImage)
                }
            })
        }

        function createBottomButtons() {
            // Bottom list button eg: view more
            card.buttons && card.buttons.map((btn, i) => {
                let bottomButton = createNode('BUTTON')
                bottomButton.className = 'list-card-bottom-button default-fullwidth-btn'
                bottomButton.title = btn.title
                bottomButton.type = btn.type
                bottomButton.innerHTML = btn.title
                bottomButton.id = 'list-card-bottom-button-' + i
                append(listCardContainer, bottomButton)
            })
        }

        listCardCount++
    }

    // Create list card function
    function createMediaCard(card, divID) {
        let mediaCardContainer = iframe.contentWindow.document.getElementById(divID)
        switch (card.media_type) {
            case 'image':
                if (card.url) {
                    let mediaImage = createNode('IMG')
                    mediaImage.src = card.url
                    mediaImage.style.width = '100%'
                    mediaImage.style.borderTopLeftRadius = '15px'
                    mediaImage.style.borderTopRightRadius = '15px'
                    mediaImage.className = 'item-img'
                    append(mediaCardContainer, mediaImage)
                }
                createBottomButtons()
                break;

            case 'video':
                if (card.url) {
                    let mediaVideo = createNode('IFRAME');
                    mediaVideo.src = card.url;
                    mediaVideo.frameborder = '0'
                    mediaVideo.allow = 'autoplay; encrypted-media'
                    mediaVideo.allowfullscreen = true
                    mediaVideo.style.width = '100%'
                    mediaVideo.style.minHeight = '200px'
                    mediaVideo.style.border = 'none'
                    append(mediaCardContainer, mediaVideo)
                }
                createBottomButtons()
                break;
        }

        function createBottomButtons() {
            // Bottom media button eg: View Website
            card.buttons && card.buttons.map((btn, i) => {
                let bottomButton = createNode('BUTTON')
                bottomButton.className = 'media-card-bottom-button default-fullwidth-btn'
                bottomButton.title = btn.title
                bottomButton.onclick = () => { window.location = btn.url }
                bottomButton.type = btn.type
                bottomButton.innerHTML = btn.title
                bottomButton.id = 'media-card-bottom-button-' + i
                append(mediaCardContainer, bottomButton)
            })
        }

        mediaCardCount++
    }

    // Create Receipt card function
    function createReceiptCard(card, divID) {
        let receiptCardContainer = idocument.getElementById(divID)

        // create card header
        createDiv(receiptCardContainer, 'receipt-card-header', 'receipt-card-header lightGray')
        let receiptCardHeader = idocument.getElementById('receipt-card-header')
        receiptCardHeader.innerHTML = 'Order confirmation'
        createItems();
        addDetail();

        function createItems() {
            // create items list
            card.elements && card.elements.map((item, i) => {
                // let receiptListItemParentDiv = createNode('DIV')
                let receiptListItemParentDiv = createDiv(receiptCardContainer, 'receipt-list-item-' + i, 'list-item-container receipt-list-item-container', { padding: 'none', border: 'none' })

                // Create list container first child
                receiptListItemLeftDivStyle = { flex: '1' }
                receiptListItemRightDivStyle = { flex: '3', paddingLeft: '10px' }
                let receiptListItemLeftDiv = createDiv(receiptListItemParentDiv, '', '', receiptListItemLeftDivStyle),
                    receiptListItemRightDiv = createDiv(receiptListItemParentDiv, '', '', receiptListItemRightDivStyle)

                // create item image
                if (item.image_url) {
                    let ItemImage = createNode('IMG')
                    ItemImage.src = item.image_url
                    ItemImage.height = 80
                    ItemImage.width = 80
                    ItemImage.style.borderRadius = '5px'
                    ItemImage.style.border = '0.15em solid #F2F2F2'
                    ItemImage.className = 'item-img'
                    append(receiptListItemLeftDiv, ItemImage)
                }

                // Create each list item childs inside parent div
                let ItemTitle = createNode('P'),
                    ItemSubtitle = createNode('P')
                // debugger
                ItemTitle.innerHTML = item.title;
                ItemTitle.className = 'item-title item-default-title';
                ItemSubtitle.innerHTML = item.subtitle;
                ItemSubtitle.className = 'item-subtitle item-default-subtitle';
                append(receiptListItemRightDiv, ItemTitle)
                append(receiptListItemRightDiv, ItemSubtitle)
                if (item.quantity) {
                    // if card item have quantity then write it
                    let ItemQty = createNode('P');
                    ItemQty.style.marginTop = '5px'
                    ItemQty.innerHTML = 'Qty. ' + item.quantity;
                    ItemQty.className = 'item-subtitle item-default-subtitle';
                    append(receiptListItemRightDiv, ItemQty)
                }
            })
        }

        function addDetail() {
            let cardAddress = card.address ? card.address.street_1 + ' ' + card.address.street_2 + ' ' + card.address.city + ', ' + card.address.state + ' ' + card.address.postal_code : ''
            let receiptDetailDiv = createDiv(receiptCardContainer, 'receipt-card-detail', 'receipt-card-detail d-font')
            let paidLabel = createNode('P', '', 'paid-label d-font', 'Paid with', receiptDetailDiv),
                paidText = createNode('P', '', 'paid-text d-font', card.payment_method, receiptDetailDiv),
                br = createNode('BR', '', '', '', receiptDetailDiv),
                addressLabel = createNode('P', '', 'address-label d-font', 'Ship to', receiptDetailDiv),
                address = createNode('P', '', 'address d-font', cardAddress, receiptDetailDiv);
        }
        receiptCardCount++
    }

    // this code identify which card you want to create
    var messangerBodyView1 = idocument.getElementById('intercom-messenger-body-id');
    var messengerBodyView2 = idocument.getElementById('messenger-body-view-2-id');
    var view2Footer = idocument.getElementById('intercom-footer-id');
    var wrapper = idocument.getElementById("wrapper");
    var messangerHeader = idocument.getElementById("messanger-header");
    var backToViewOneBtn = idocument.getElementById("backToViewOneBtn");
    function createCard(payload) {
        switch (payload.template_type) {
            case 'generic':
                createDiv(messangerBodyView1, 'generic-cards-container', 'generic-cards-container blue-horizontal-scroll') //parent, id, className
                var genericCardsContainer = idocument.getElementById('generic-cards-container');
                payload.elements && payload.elements.map((card, i) => {
                    let divID = payload.template_type + '-' + genericCard;
                    let div = createNode('div')
                    div.id = divID
                    div.className = 'generic-container'
                    div.style.backgroundImage = "url('http://backgroundcheckall.com/wp-content/uploads/2017/12/black-studio-background-hd-2.jpg')"
                    append(genericCardsContainer, div)
                    createGenericCard(card, divID)
                })
                break;

            case 'button':
                let divID = 'button-card-' + buttonCard;
                let div = createNode('div');
                div.id = divID;
                div.className = 'button-card-container'
                append(messangerBodyView1, div)
                createButtonCard(payload, divID)
                break;

            case 'list':
                let ListItemParentId = 'list-card-' + listCardCount;
                let ListItemParentDiv = createNode('div');
                ListItemParentDiv.id = ListItemParentId;
                ListItemParentDiv.className = 'list-card-container'
                append(messangerBodyView1, ListItemParentDiv)
                createListCard(payload, ListItemParentId)
                break;

            case 'media':
                payload.elements && payload.elements.map((card, i) => {
                    let mediaCardParentId = 'media-card-' + mediaCardCount;
                    let mediaCardParentDiv = createNode('div');
                    mediaCardParentDiv.id = mediaCardParentId;
                    mediaCardParentDiv.className = 'media-card-container default-container'
                    append(messangerBodyView1, mediaCardParentDiv)
                    createMediaCard(card, mediaCardParentId)
                })
                break;

            case 'receipt':
                let receiptItemParentId = 'receipt-card-' + receiptCardCount;
                createDiv(messangerBodyView1, receiptItemParentId, 'receipt-card-container default-container') //parent, id, className
                createReceiptCard(payload, receiptItemParentId)
                break;
        }
    }

    function createQuickReply(message) {
        let { quick_replies, text } = message;
        createMessageNode(text)
        createQuickReplyButtons(quick_replies)
    }

    function createMessageNode(msg) {
        var messangerBodyView1 = iframe.contentWindow.document.getElementById("intercom-messenger-body-id");
        createDiv(messangerBodyView1, "receiveTextMessage-" + receiveTextMessageCount, "textMessage");
        var textMessageParent = iframe.contentWindow.document.getElementById("receiveTextMessage-" + receiveTextMessageCount);
        textMessageParent.innerHTML = msg;
        receiveTextMessageCount++
    }

    function createQuickReplyButtons(quick_replies) {
        var messangerBodyView1 = iframe.contentWindow.document.getElementById("intercom-messenger-body-id");
        createDiv(messangerBodyView1, "quick-reply-buttons", "quick-reply-buttons blue-horizontal-scroll");
        var quickReplyButtons = iframe.contentWindow.document.getElementById("quick-reply-buttons");
        quick_replies && quick_replies.map((btn, i) => {
            let quickReplyButton = createNode('BUTTON');
            quickReplyButton.className = 'quick-replay-button'
            quickReplyButton.title = btn.title
            quickReplyButton.style.display = 'flex'
            quickReplyButton.onclick = () => {
                createMessageNode(btn.title);
                quickReplyButtons.remove();
            }
            quickReplyButton.id = 'quick-replay-button-' + i;
            quickReplyButton.innerHTML = btn.title
            append(quickReplyButtons, quickReplyButton)
            // Create Icon inside button if url exist
            if (btn.image_url) {
                quickReplyButtonIcon = createNode('IMG');
                quickReplyButtonIcon.src = btn.image_url;
                quickReplyButtonIcon.height = 18;
                quickReplyButtonIcon.width = 18;
                quickReplyButtonIcon.style.marginLeft = '5px';
                quickReplyButtonIcon.className = 'quick-replay-button-icon'
                append(quickReplyButton, quickReplyButtonIcon)
            }
        })
    }

    function createImg(parent, src, id, className, style) {
        newImg = createNode('IMG');
        newImg.src = src;
        if (id) {
            newImg.id = id;
        }
        if (className) {
            newImg.className = className;
        }
        if (style) {
            newImg = addStyles(newImg, style)
        }
        return parent.appendChild(newImg);
    }

    function createButton(parent, id, className, title, onclick, style) {
        var newBtn = document.createElement("BUTTON");
        if (id) {
            newBtn.id = id;
        }
        if (className) {
            newBtn.className = className;
        }
        if (onclick) {
            newBtn.onclick = onclick;
        }
        if (title) {
            newBtn.innerHTML = title;
            newBtn.title = title
        }
        if (style) {
            newImg = addStyles(newBtn, style)
        }
        // newBtn.onclick = function () { showChatWindow() };
        return parent.appendChild(newBtn);
    }

    function createStartConversationCard() {
        let startConversationDiv = createDiv(messangerBodyView1, 'start-conversation-cards-container', 'start-conversation-cards-container default-container') //parent, id, className
        let startConversationHeading = createNode('P'), startConversationPara = createNode('P')
        startConversationHeading.innerHTML = 'Start a Conversation'
        startConversationHeading.className = 'start-a-conversation-heading d-font'
        startConversationPara.innerHTML = 'The team typically replies in a few hours'
        startConversationPara.className = 'start-a-conversation-para'
        append(startConversationDiv, startConversationHeading)
        append(startConversationDiv, startConversationPara)
        let startConversationImageContainer = createDiv(startConversationDiv, 'start-conversation-imgs', 'start-conversation-imgs') //parent, id, className
        let imgs = [
            'https://statusandphoto.weebly.com/uploads/6/0/1/5/60158603/8347592_orig.png',
            'https://www.trickscity.com/wp-content/uploads/2016/11/51b91bba5a3fd9b6c8b9c53bc0ab6c65.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAjvR6CixyhFjeG2yAzXA1EpBiwMSjiZFv67oG4Vw-uT5Iz7s',
            'https://mobirise.com/bootstrap-template/profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg',
            'https://www.bigredcloud.com/wp-content/uploads/4-tips-for-taking-professional-profile-pictures.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpKwDji4mANkqkGncYeD8osJaScTp_SnBSKeUdVpJS3agulaJNUw'
        ]
        let startConversationImageStyle = { height: '50px', width: '50px', borderRadius: '50%', marginLeft: '-15px', border: '2px solid #fff' }
        imgs.map((src) => {
            createImg(startConversationImageContainer, src, '', '', startConversationImageStyle)
        })
        let startConversationBottomButtons = createDiv(startConversationDiv, 'start-conversation-bottom-buttons', 'start-conversation-bottom-buttons')
        createButton(startConversationBottomButtons, '', 'start-conversation-btn', 'New Conversation', function () {
            // handle some ui to show second view
            messangerBodyView1.style.display = 'none';
            messengerBodyView2.style.display = 'block';
            messengerBodyView2.style.marginTop = '50px';
            view2Footer.style.display = 'block';
            wrapper.style.marginBottom = '73px';
            messangerHeader.style.overflow = 'hidden';
            messangerHeader.style.height = '55px';
            backToViewOneBtn.style.display = 'block';
        })
        createButton(startConversationBottomButtons, '', 'see-prvious-btn', 'See Prvious')
    }

    function createFindAnAnswerCard() {
        let findAnAnswer_Div = createDiv(messangerBodyView1, "findAnAnswer_id", "findAnAnswer_class default-container")
        let heading = createNode('p', "", "start-a-conversation-heading d-font", "Find an answer quickly", findAnAnswer_Div)
        let makeInput = document.createElement("INPUT")
        makeInput.setAttribute("type", "text");
        makeInput.setAttribute("placeholder", "Search for answer");
        append(findAnAnswer_Div, makeInput)
        createButton(findAnAnswer_Div, '', 'email_btn', '->')

    }
    // const url = 'https://nonchalant-soprano.glitch.me/generic';
    // fetch(url)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         let { message: { attachment: { payload } } } = data
    //         createCard(payload)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // const buttonsUrl = 'https://nonchalant-soprano.glitch.me/buttons';
    // fetch(buttonsUrl)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         let { message: { attachment: { payload } } } = data
    //         createCard(payload)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // const listUrl = 'https://nonchalant-soprano.glitch.me/list';
    // fetch(listUrl)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         let { message: { attachment: { payload } } } = data
    //         createCard(payload)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // const quickReplyUrl = 'https://nonchalant-soprano.glitch.me/quickReply';
    // fetch(quickReplyUrl)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         let { message, recipient } = data
    //         createQuickReply(message)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // const mediaUrl = 'https://nonchalant-soprano.glitch.me/media';
    // fetch(mediaUrl)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         let { message: { attachment: { payload } } } = data
    //         createCard(payload)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // const receiptUrl = 'https://nonchalant-soprano.glitch.me/receipt';
    // fetch(receiptUrl)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         let { message: { attachment: { payload } } } = data
    //         createCard(payload)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    createStartConversationCard()
    createFindAnAnswerCard()
    var btn = document.createElement("button");
    var t = document.createTextNode("Show");
    btn.appendChild(t);
    btn.onclick = function () { showChatWindow() };
    btn.className = 'chat-icon'
    document.body.appendChild(btn);

    function showChatWindow() {
        if (isChatWindowOpen) {
            document.getElementById('chat-window-container').setAttribute("class", "chat-window-container");
            isChatWindowOpen = false
        } else {
            document.getElementById('chat-window-container').setAttribute("class", "show-chat-window");
            isChatWindowOpen = true
        }

    }

    var style = document.createElement("style");
    var btnCss = document.createTextNode(".chat-icon { height: 60px;width: 60px;position: fixed;bottom: 10px;right: 10px;border-radius: 50%;border: none;    background: #6E3297;color: #fff;outline: none;cursor: pointer;}");
    var iframCss = document.createTextNode(".chat-window-container {z-index: 2147483000!important; position: fixed!important; bottom: 90px; right: 20px; width: 376px !important; min-height: 80% !important; max-height: 704px !important; display:none; border-radius: 8px; box-shadow: 0 5px 40px rgba(0,0,0,.16) !important; overflow: hidden! important; opacity: 1 !important; border: none}");
    var showChatWindowCss = document.createTextNode(".show-chat-window { z-index: 2147483000!important; position: fixed!important; bottom: 90px;right: 20px; width: 376px !important; min-height: 80% !important; max-height: 704px !important; display:block; box-shadow: 0 5px 40px rgba(0,0,0,.16) !important; border-radius: 8px; overflow: hidden! important; opacity: 1 !important; border: none}");
    style.appendChild(btnCss);
    style.appendChild(iframCss);
    style.appendChild(showChatWindowCss);
    document.head.appendChild(style);
})()