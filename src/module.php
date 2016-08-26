<?php
/**
 * @package Abricos
 * @subpackage Working
 * @copyright 2016 Alexander Kuzmin
 * @license http://opensource.org/licenses/mit-license.php MIT License
 * @author Alexander Kuzmin <roosit@abricos.org>
 */

/**
 * Class WorkingModule
 *
 * @method WorkingManager GetManager()
 */
class WorkingModule extends Ab_Module {

    public function __construct(){
        $this->version = "0.1.0";
        $this->name = "working";
        $this->permission = new WorkingPermission($this);
    }

    public function Bos_IsMenu(){
        return true;
    }
}

class WorkingAction {
    const VIEW = 10;
    const WRITE = 30;
    const ADMIN = 50;
}

class WorkingPermission extends Ab_UserPermission {

    public function __construct(WorkingModule $module){

        $defRoles = array(
            new Ab_UserRole(WorkingAction::VIEW, Ab_UserGroup::GUEST),
            new Ab_UserRole(WorkingAction::VIEW, Ab_UserGroup::REGISTERED),
            new Ab_UserRole(WorkingAction::VIEW, Ab_UserGroup::ADMIN),

            new Ab_UserRole(WorkingAction::WRITE, Ab_UserGroup::REGISTERED),
            new Ab_UserRole(WorkingAction::WRITE, Ab_UserGroup::ADMIN),

            new Ab_UserRole(WorkingAction::WRITE, Ab_UserGroup::ADMIN),
            new Ab_UserRole(WorkingAction::ADMIN, Ab_UserGroup::ADMIN),
        );
        parent::__construct($module, $defRoles);
    }

    public function GetRoles(){
        return array(
            WorkingAction::VIEW => $this->CheckAction(WorkingAction::VIEW),
            WorkingAction::WRITE => $this->CheckAction(WorkingAction::WRITE),
            WorkingAction::ADMIN => $this->CheckAction(WorkingAction::ADMIN)
        );
    }
}

Abricos::ModuleRegister(new WorkingModule());
