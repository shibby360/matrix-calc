class Line extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.shadow = this.attachShadow({mode:"open"});
        this.jqshdw = $(this.shadow)
        let styles = `<style>
        [aria-hidden="true"] {
            display: none;
        }</style>`
        this.jqshdw.append(styles)
        let html = katex.renderToString("x")
        // subscripts are with [] or .
        let maindiv = $('<div class="bg-green-400" style="border: 3px black solid; width: 50vw; height: 50px; margin: 3px;" contenteditable mathtext="x">' + html + '</div>')
        this.jqshdw.append(maindiv)
        maindiv.on("focus", function(ev) {
            maindiv.html(maindiv.attr('mathtext'))
        })
        maindiv.on("blur", function(ev) {
            maindiv.attr('mathtext', maindiv.text())
            maindiv.html(katex.renderToString(math.parse(maindiv.attr('mathtext')).toTex()))
        })
    }
}
customElements.define('line-', Line)