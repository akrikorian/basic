
var ApiGen = ApiGen || {};
ApiGen.elements = [["c","Module\\Authentication\\Permission"],["p","Module\\Authentication\\Permission::$table"],["c","Module\\Authentication\\Role"],["p","Module\\Authentication\\Role::$table"],["m","Module\\Authentication\\Role::getPermission()"],["m","Module\\Authentication\\Role::load()"],["m","Module\\Authentication\\Role::setPermission()"],["c","Module\\Authentication\\User"],["p","Module\\Authentication\\User::$metadata"],["p","Module\\Authentication\\User::$table"],["m","Module\\Authentication\\User::authenticate()"],["m","Module\\Authentication\\User::getPermission()"],["m","Module\\Authentication\\User::getRole()"],["m","Module\\Authentication\\User::getUserData()"],["m","Module\\Authentication\\User::isAdmin()"],["m","Module\\Authentication\\User::isLoaded()"],["m","Module\\Authentication\\User::isLoggedIn()"],["m","Module\\Authentication\\User::load()"],["m","Module\\Authentication\\User::saltPassword()"],["m","Module\\Authentication\\User::save()"],["m","Module\\Authentication\\User::setUserData()"],["c","Module\\Authentication\\UserMeta"],["p","Module\\Authentication\\UserMeta::$table"],["c","Module\\CSV\\Document"],["p","Module\\CSV\\Document::$data"],["p","Module\\CSV\\Document::$delimiter"],["p","Module\\CSV\\Document::$filename"],["m","Module\\CSV\\Document::__construct()"],["m","Module\\CSV\\Document::add()"],["m","Module\\CSV\\Document::delete()"],["m","Module\\CSV\\Document::load()"],["m","Module\\CSV\\Document::save()"],["m","Module\\CSV\\Document::search()"],["m","Module\\CSV\\Document::show()"],["c","Module\\DB\\DB"],["p","Module\\DB\\DB::$dbhost"],["p","Module\\DB\\DB::$dbname"],["p","Module\\DB\\DB::$dbpass"],["p","Module\\DB\\DB::$dbuser"],["m","Module\\DB\\DB::getInstance()"],["c","Module\\DB\\Grid"],["p","Module\\DB\\Grid::$asc"],["p","Module\\DB\\Grid::$canSortby"],["p","Module\\DB\\Grid::$db"],["p","Module\\DB\\Grid::$excluded"],["p","Module\\DB\\Grid::$map"],["p","Module\\DB\\Grid::$maxRecords"],["p","Module\\DB\\Grid::$meta"],["p","Module\\DB\\Grid::$name"],["p","Module\\DB\\Grid::$page"],["p","Module\\DB\\Grid::$querystring"],["p","Module\\DB\\Grid::$sortBy"],["p","Module\\DB\\Grid::$sql"],["m","Module\\DB\\Grid::__construct()"],["m","Module\\DB\\Grid::exclude()"],["m","Module\\DB\\Grid::mapFields()"],["m","Module\\DB\\Grid::numberOfPages()"],["m","Module\\DB\\Grid::setQuerystring()"],["m","Module\\DB\\Grid::show()"],["m","Module\\DB\\Grid::sort()"],["m","Module\\DB\\Grid::sortable()"],["c","Module\\DB\\Record"],["p","Module\\DB\\Record::$columns"],["p","Module\\DB\\Record::$db"],["p","Module\\DB\\Record::$meta"],["p","Module\\DB\\Record::$primaryKey"],["p","Module\\DB\\Record::$table"],["m","Module\\DB\\Record::__construct()"],["m","Module\\DB\\Record::delete()"],["m","Module\\DB\\Record::form()"],["m","Module\\DB\\Record::load()"],["m","Module\\DB\\Record::save()"],["c","Module\\FormBuilder\\Form"],["p","Module\\FormBuilder\\Form::$action"],["p","Module\\FormBuilder\\Form::$class"],["p","Module\\FormBuilder\\Form::$id"],["p","Module\\FormBuilder\\Form::$method"],["p","Module\\FormBuilder\\Form::$validate"],["m","Module\\FormBuilder\\Form::__construct()"],["m","Module\\FormBuilder\\Form::getDataMap()"],["m","Module\\FormBuilder\\Form::render()"],["m","Module\\FormBuilder\\Form::submitted()"],["m","Module\\FormBuilder\\Form::validate()"],["c","Module\\FormBuilder\\States"],["m","Module\\FormBuilder\\States::jsonArray()"],["c","Module\\FSDB\\Connection"],["m","Module\\FSDB\\Connection::__call()"],["m","Module\\FSDB\\Connection::__construct()"],["c","Module\\IP2Country\\Converter"],["m","Module\\IP2Country\\Converter::__construct()"],["m","Module\\IP2Country\\Converter::getCountryCode()"],["m","Module\\IP2Country\\Converter::getTable()"],["c","Module\\Mailer\\Message"],["m","Module\\Mailer\\Message::__construct()"],["m","Module\\Mailer\\Message::addBcc()"],["m","Module\\Mailer\\Message::addCc()"],["m","Module\\Mailer\\Message::addFrom()"],["m","Module\\Mailer\\Message::addSubject()"],["m","Module\\Mailer\\Message::addTo()"],["m","Module\\Mailer\\Message::fetchHtml()"],["m","Module\\Mailer\\Message::msgText()"],["m","Module\\Mailer\\Message::send()"],["c","Module\\MobiDetect\\Detector"],["m","Module\\MobiDetect\\Detector::__construct()"],["m","Module\\MobiDetect\\Detector::isAndroid()"],["m","Module\\MobiDetect\\Detector::isBlackberry()"],["m","Module\\MobiDetect\\Detector::isIpad()"],["m","Module\\MobiDetect\\Detector::isIphone()"],["m","Module\\MobiDetect\\Detector::isMobile()"],["m","Module\\MobiDetect\\Detector::isOpera()"],["m","Module\\MobiDetect\\Detector::isPalm()"],["m","Module\\MobiDetect\\Detector::isWindowsPhone()"],["c","Module\\Mobile\\Retina"],["m","Module\\Mobile\\Retina::processDownsize()"],["m","Module\\Mobile\\Retina::scaleDown()"],["c","Module\\Navigation\\Builder"],["m","Module\\Navigation\\Builder::__construct()"],["m","Module\\Navigation\\Builder::setCurrent()"],["m","Module\\Navigation\\Builder::show()"],["c","Sleepy\\Debug"],["p","Sleepy\\Debug::$dbHost"],["p","Sleepy\\Debug::$dbName"],["p","Sleepy\\Debug::$dbPass"],["p","Sleepy\\Debug::$dbTable"],["p","Sleepy\\Debug::$dbUser"],["p","Sleepy\\Debug::$emailBCC"],["p","Sleepy\\Debug::$emailBuffer"],["p","Sleepy\\Debug::$emailCC"],["p","Sleepy\\Debug::$emailFrom"],["p","Sleepy\\Debug::$emailSubject"],["p","Sleepy\\Debug::$emailTo"],["p","Sleepy\\Debug::$enable_log"],["p","Sleepy\\Debug::$enable_send"],["p","Sleepy\\Debug::$enable_show"],["m","Sleepy\\Debug::__destruct()"],["m","Sleepy\\Debug::disable()"],["m","Sleepy\\Debug::exceptionHandler()"],["m","Sleepy\\Debug::out()"],["m","Sleepy\\Debug::sendEmail()"],["m","Sleepy\\Debug::setHandler()"],["c","Sleepy\\Hook"],["p","Sleepy\\Hook::$directories"],["m","Sleepy\\Hook::addAction()"],["m","Sleepy\\Hook::addFilter()"],["m","Sleepy\\Hook::applyFilter()"],["m","Sleepy\\Hook::doAction()"],["c","Sleepy\\Router"],["p","Sleepy\\Router::$delimiter"],["p","Sleepy\\Router::$parameters"],["p","Sleepy\\Router::$querystring"],["p","Sleepy\\Router::$routeFound"],["m","Sleepy\\Router::getArray()"],["m","Sleepy\\Router::hasRouted()"],["m","Sleepy\\Router::route()"],["m","Sleepy\\Router::start()"],["c","Sleepy\\SM"],["p","Sleepy\\SM::$is_initialized"],["m","Sleepy\\SM::__destruct()"],["m","Sleepy\\SM::initialize()"],["m","Sleepy\\SM::isDev()"],["m","Sleepy\\SM::isENV()"],["m","Sleepy\\SM::isLive()"],["m","Sleepy\\SM::isStage()"],["c","Sleepy\\Template"],["p","Sleepy\\Template::$_data"],["p","Sleepy\\Template::$_file"],["p","Sleepy\\Template::$directory"],["p","Sleepy\\Template::$extension"],["m","Sleepy\\Template::__construct()"],["m","Sleepy\\Template::bind()"],["m","Sleepy\\Template::bindStart()"],["m","Sleepy\\Template::bindStop()"],["m","Sleepy\\Template::get()"],["m","Sleepy\\Template::retrieve()"],["m","Sleepy\\Template::setTemplate()"],["m","Sleepy\\Template::show()"]];
