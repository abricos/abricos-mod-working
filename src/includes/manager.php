<?php
/**
 * @package Abricos
 * @subpackage Working
 * @copyright 2016 Alexander Kuzmin
 * @license http://opensource.org/licenses/mit-license.php MIT License
 * @author Alexander Kuzmin <roosit@abricos.org>
 */

/**
 * Class WorkingManager
 */
class WorkingManager extends Ab_ModuleManager {

    public function IsAdminRole(){
        return $this->IsRoleEnable(WorkingAction::ADMIN);
    }

    public function IsWriteRole(){
        if ($this->IsAdminRole()){
            return true;
        }
        return $this->IsRoleEnable(WorkingAction::WRITE);
    }

    public function IsViewRole(){
        if ($this->IsWriteRole()){
            return true;
        }
        return $this->IsRoleEnable(WorkingAction::VIEW);
    }

    public function GetApp(){
        Abricos::GetApp('team');
        return parent::GetApp();
    }

    public function AJAX($d){
        return $this->GetApp()->AJAX($d);
    }

    public function Bos_MenuData(){
        if (!$this->IsViewRole()){
            return null;
        }
        $i18n = $this->module->I18n();
        return array(
            array(
                "name" => "working",
                "title" => $i18n->Translate('title'),
                "icon" => "/modules/working/images/icon.gif",
                "url" => "working/wspace/ws",
            )
        );
    }
}
