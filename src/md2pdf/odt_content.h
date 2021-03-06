const char HEADER[] = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<office:document-content xmlns:office=\"urn:oasis:names:tc:opendocument:xmlns:office:1.0\" \
xmlns:xlink=\"http://www.w3.org/1999/xlink\" \
xmlns:text=\"urn:oasis:names:tc:opendocument:xmlns:text:1.0\" \
xmlns:draw=\"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0\" \
office:version=\"1.2\" \
office:mimetype=\"application/vnd.oasis.opendocument.text\">\n\
<office:automated-styles>\
<text:list-style style:name=\"list\">\
<text:list-level-style-bullet text:level=\"1\" text:bullet-char=\"\xe2\x80\xa2\">\
<style:list-level-properties text:list-level-position-and-space-mode=\"label-alignment\">\
<style:list-level-label-alignment text:list-tab-stop-position=\"0.5in\" fo:text-indent=\"-0.25in\" fo:margin-left=\"0.5in\"/>\
</style:list-level-properties>\
</text:list-level-style-bullet>\
</text:list-style>\
</office:automated-styles>\
<office:body><office:text text:use-soft-page-breaks=\"true\">\n";
const char FOOTER[] = "</office:text></office:body></office:document-content>";

const char ITALIC_START_TAG[] = "<text:span text:style-name=\"italic\">";
const char BOLD_START_TAG[] = "<text:span text:style-name=\"bold\">";
const char MONO_START_TAG[] = "<text:span text:style-name=\"mono\">";
const char SCAPS_START_TAG[] = "<text:span text:style-name=\"smallcaps\">";
const char SUP_START_TAG[] = "<text:span text:style-name=\"sup\">";
const char SUB_START_TAG[] = "<text:span text:style-name=\"sub\">";
const char SPAN_END_TAG[] = "</text:span>";
const int  MAX_TITLE_LEVEL = 6;
const char * TITLE_START_TAG[] = {
	"<text:h text:style-name=\"title1\">",
	"<text:h text:style-name=\"title2\">",
	"<text:h text:style-name=\"title3\">",
	"<text:h text:style-name=\"title4\">",
	"<text:h text:style-name=\"title5\">",
	"<text:h text:style-name=\"title6\">"
};
const char TITLE_END_TAG[] = "</text:h>";
const char PARAGRAPH_START_TAG[] = "<text:p text:style-name=\"text\">";
const char CODE_START_TAG[] = "<text:p text:style-name=\"code\">";
const char PARAGRAPH_END_TAG[] = "</text:p>\n";
const char LINK_START_TAG_BEGIN[] = "<text:a xlink:type=\"simple\" xlink:href=\"";
const char LINK_START_TAG_END[] = "\">";
const char LINK_END_TAG[] = "</text:a>";
const char IMAGE_START_TAG[] = "<draw:frame><draw:image xlink:href=\"";
const char IMAGE_END_TAG[] = "\"/></draw:frame>";
const char LIST_START_TAG[] = "<text:list text:style-name=\"list\">";
const char LIST_END_TAG[] = "</text:list>";
const char ITEM_START_TAG[] = "<text:list-item><text:p text:style-name=\"text\">";
const char ITEM_END_TAG[] = "</text:p></text:list-item>";
const char SINGLE_QUOTE_START[] = {0xE2, 0x80, 0x98, 0};
const char SINGLE_QUOTE_END[] = {0xE2, 0x80, 0x99, 0};
const char DOUBLE_QUOTE_START[] = {0xE2, 0x80, 0x9C, 0};
const char DOUBLE_QUOTE_END[] = {0xE2, 0x80, 0x9D, 0};
const char NON_BREAKING_SPACE[] = {0xC2, 0xA0, 0};
const char LONG_DASH[] = {0xE2, 0x80, 0x93, 0};

