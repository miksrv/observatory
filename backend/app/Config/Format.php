<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Format\FormatterInterface;

define('APP_JSON', 'application/json');
define('APP_XML', 'application/xml');
define('APP_TEXT', 'text/xml');

class Format extends BaseConfig
{
	/**
	 * --------------------------------------------------------------------------
	 * Available Response Formats
	 * --------------------------------------------------------------------------
	 *
	 * When you perform content negotiation with the request, these are the
	 * available formats that your application supports. This is currently
	 * only used with the API\ResponseTrait. A valid Formatter must exist
	 * for the specified format.
	 *
	 * These formats are only checked when the data passed to the respond()
	 * method is an array.
	 *
	 * @var string[]
	 */
	public array $supportedResponseFormats = [
        APP_JSON,
        APP_XML, // machine-readable XML
        APP_TEXT, // human-readable XML
	];

	/**
	 * --------------------------------------------------------------------------
	 * Formatters
	 * --------------------------------------------------------------------------
	 *
	 * Lists the class to use to format responses with of a particular type.
	 * For each mime type, list the class that should be used. Formatters
	 * can be retrieved through the getFormatter() method.
	 *
	 * @var array<string, string>
	 */
	public $formatters = [
        APP_JSON => 'CodeIgniter\Format\JSONFormatter',
        APP_XML  => 'CodeIgniter\Format\XMLFormatter',
        APP_TEXT => 'CodeIgniter\Format\XMLFormatter',
	];

	/**
	 * --------------------------------------------------------------------------
	 * Formatters Options
	 * --------------------------------------------------------------------------
	 *
	 * Additional Options to adjust default formatters behaviour.
	 * For each mime type, list the additional options that should be used.
	 *
	 * @var array<string, int>
	 */
	public $formatterOptions = [
        APP_JSON => JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES,
        APP_XML  => 0,
        APP_TEXT => 0,
	];

	//--------------------------------------------------------------------

	/**
	 * A Factory method to return the appropriate formatter for the given mime type.
	 *
	 * @param string $mime
	 *
	 * @return FormatterInterface
	 *
	 * @deprecated This is an alias of `\CodeIgniter\Format\Format::getFormatter`. Use that instead.
	 */
	public function getFormatter(string $mime): FormatterInterface
    {
		return Services::format()->getFormatter($mime);
	}
}
