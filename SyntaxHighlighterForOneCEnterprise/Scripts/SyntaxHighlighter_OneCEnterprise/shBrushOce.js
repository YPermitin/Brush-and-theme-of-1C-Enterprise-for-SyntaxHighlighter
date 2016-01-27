
/* version of 1C module for SyntaxHighliter + Composite C1 CMS */
/* created by Permitin Y.A. aka YPermitin */
/* http://www.develplatform.ru */

; (function () {
    // CommonJS
    typeof (require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush() {
        // Формируем регулярное выражение для поиска ключевых слов
        //var specChars = ' ()\=\-\+\\/\*.,;:\[\]\{\}';
        var keywords = '';
        var keyWordsList = ['Пока', 'Цикл', 'КонецЦикла', 'Для', 'По', 'Каждого',
                            'Новый', 'Функция', 'Возврат', 'КонецФункции', 'Или', 'Перем', 'Экспорт', 'Процедура',
                            'КонецПроцедуры', 'Если', 'Тогда', 'ИначеЕсли', 'КонецЕсли', 'Из', 'Не', 'Истина', 'Ложь',
                            'Попытка', 'Исключение', 'КонецПопытки', 'Иначе', 'NULL', 'Неопределено', 'ВызватьИсключение',
                            'While', 'For', 'Each',  'In', 'Do', 'To', 'New', 'Function', 'Return', 'EndDo', 
                            'EndFunction', 'Or', 'Var', 'Export', 'Procedure', 'EndProcedure', 'If', 'Then', 
                            'Else', 'ElsIf', 'EndIf', 'Not', 'True', 'False', 
                            'Try', 'Except', 'Raise', 'EndTry', 'Undefined'
                           ];
        for (index = 0; index < keyWordsList.length; ++index) {
            keywords = keywords + keyWordsList[index];
            if (index == keyWordsList.length-1)
                keywords = keywords;
            else
                keywords = keywords + '|';
        }
        keywords = '(^|\\s)(' + keywords + ')(?=\\s|$|;)';

        function getKeywordsCyr(str) {
            str = str
                .replace(/^s+|s+$/g, '')
                .replace(/s+/g, '|')
            ;

            var specChars = ' ()\=\-\+\\/\*.,;:\[\]\{\}';
            return '(^|[^A-Za-z0-9а-яё])(' + str + ')(?=([' + specChars + ']|$))';
        }


        // Определяем регулярные выражения для каждого их вариантов подсветки
        this.regexList = [
            { regex: SyntaxHighlighter.regexLib.singleLineCComments, css: 'comments' },		        // Однострочный комментарий
            { regex: /(["'])(?:(?!\1)[^\\]|\\.)*\1/gi, css: 'string' },		                        // Строка в двойных кавычках
            { regex: SyntaxHighlighter.regexLib.singleQuotedString, css: 'string' },		        // Строка в одинарных кавычках
            { regex: new RegExp('\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b', 'gi'), css: 'number' },	// Числа
            { regex: /\+|\)|\(|\.|\\|\*|=|\:|;|\&lt;|\&gt;|\[|\]|\?/g, css: 'punctuation' },		// Пунктуация
            //{ regex: getKeywordsCyr(keywords), css: 'keyword' },		                            // Ключевые слова
            { regex: new RegExp(keywords, 'gi'), css: 'keyword' },		                            // Ключевые слова
            { regex: /^\s*#.*/gm, css: 'preprocessor' },		                                    // Теги препроцессора вида #Область и #КонецОбласти
            { regex: /^\s*&.*/gm, css: 'preprocessor' },		                                    // Теги препроцессора вида &Клиент and &Сервер
        ];
    }

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['oce']; // Имя класса блока на странице, для которого будет использован этот скрипт

    SyntaxHighlighter.brushes.Bash = Brush;

    // CommonJS
    typeof (exports) != 'undefined' ? exports.Brush = Brush : null;
})();