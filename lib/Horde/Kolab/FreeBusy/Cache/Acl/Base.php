<?php
/**
 * Free/busy access control that ignores ACL information and simply collects all
 * partials belonging to one user.
 *
 * PHP version 5
 *
 * @category Kolab
 * @package  Kolab_FreeBusy
 * @author   Gunnar Wrobel <wrobel@pardus.de>
 * @license  http://www.fsf.org/copyleft/lgpl.html LGPL
 * @link     http://pear.horde.org/index.php?package=Kolab_FreeBusy
 */

/**
 * Free/busy access control that ignores ACL information and simply collects all
 * partials belonging to one user.
 *
 * Copyright 2008-2010 Klarälvdalens Datakonsult AB
 *
 * See the enclosed file COPYING for license information (LGPL). If you did not
 * receive this file, see
 * http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html.
 *
 * @category Kolab
 * @package  Kolab_FreeBusy
 * @author   Gunnar Wrobel <wrobel@pardus.de>
 * @license  http://www.fsf.org/copyleft/lgpl.html LGPL
 * @link     http://pear.horde.org/index.php?package=Kolab_FreeBusy
 */
abstract class Horde_Kolab_FreeBusy_Cache_Acl_Base
implements Horde_Kolab_FreeBusy_Cache_Acl
{
    /**
     * The cache structure.
     *
     * @var Horde_Kolab_FreeBusy_Cache_Structure
     */
    protected $_structure;

    /**
     * Constructor.
     *
     * @param Horde_Kolab_FreeBusy_Cache_Structure $structure Cache structure.
     */
    public function __construct(
        Horde_Kolab_FreeBusy_Cache_Structure $structure
    ) {
        $this->_structure = $structure;
    }
}