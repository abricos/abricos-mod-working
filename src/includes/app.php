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
 *
 * @property WorkingManager $manager
 */
class WorkingApp extends AbricosApplication  {

    protected function GetClasses(){
        return array(
            'Config' => 'WorkingConfig'
        );
    }

    protected function GetStructures(){
        return 'Config';
    }

    public function ResponseToJSON($d){
        switch ($d->do){
            case "config":
                return $this->ConfigToJSON();
            case "configSave":
                return $this->ConfigSaveToJSON($d->config);

        }
        return null;
    }

    public function ConfigToJSON(){
        $res = $this->Config();
        return $this->ResultToJSON('config', $res);
    }

    /**
     * @return WorkingConfig
     */
    public function Config(){
        if (isset($this->_cache['Config'])){
            return $this->_cache['Config'];
        }

        if (!$this->manager->IsViewRole()){
            return AbricosResponse::ERR_FORBIDDEN;
        }

        $phrases = Abricos::GetModule('working')->GetPhrases();

        $d = array();
        for ($i = 0; $i < $phrases->Count(); $i++){
            $ph = $phrases->GetByIndex($i);
            $d[$ph->id] = $ph->value;
        }

        /*
        if (!isset($d['lifetime'])){
            $d['lifetime'] = "3600";
        }
        /**/

        /** @var WorkingConfig $config */
        $config = $this->InstanceClass('Config', $d);

        return $this->_cache['Config'] = $config;
    }

    public function ConfigSaveToJSON($d){
        $this->ConfigSave($d);
        return $this->ConfigToJSON();
    }

    public function ConfigSave($d){
        if (!$this->manager->IsAdminRole()){
            return AbricosResponse::ERR_FORBIDDEN;
        }

        // $phs = Abricos::GetModule('working')->GetPhrases();
        // $phs->Set("lifetime", intval($d->lifetime));

        Abricos::$phrases->Save();
    }
}
