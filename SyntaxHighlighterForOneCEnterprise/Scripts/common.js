$(document).ready(function () {
    $sourceCode = $("#sourceCode");
    $sourceCode.on("input", doHighlight);
    $sourceCode.on("keydown", onKeyDownEvent);

    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.defaults['gutter'] = true;
    SyntaxHighlighter.highlight();
});

function doHighlight()
{
    var source = $("#sourceCode");
    var code = source.val();

    if (code == "")
        code = "Сообщить('Привет Мир!');";

    var highlightCode = $("#highlightResult");
    highlightCode.html(
        '<pre id="HighlightCode" class="brush: oce">'+
            code +
        '</pre>'
    );

    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.defaults['gutter'] = true;
    SyntaxHighlighter.highlight();
}

function onKeyDownEvent(event) {
    // выходим если это не кропка tab
    if (event.keyCode != 9)
        return;

    event.preventDefault();

    // Opera, FireFox, Chrome
    var obj = $(this)[0],
    start = obj.selectionStart,
    end = obj.selectionEnd,
    before = obj.value.substring(0, start),
    after = obj.value.substring(end, obj.value.length);

    obj.value = before + "\t" + after;

    // устанавливаем курсор
    obj.setSelectionRange(start + 1, start + 1);
}