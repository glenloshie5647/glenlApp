import React, { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BACKUPANDSYNC_FEATURES } from '@glenlapp/profile-sync-controller/user-storage';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { MetaMetricsContext } from '../../../../contexts/metametrics';
import { useBackupAndSync } from '../../../../hooks/identity/useBackupAndSync';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../../shared/constants/metametrics';
import {
  selectIsBackupAndSyncEnabled,
  selectIsBackupAndSyncUpdateLoading,
} from '../../../../selectors/identity/backup-and-sync';
import { selectIsMetamaskNotificationsEnabled } from '../../../../selectors/glenlapp-notifications/glenlapp-notifications';
import { showModal } from '../../../../store/actions';
import { Box, Text } from '../../../component-library';
import ToggleButton from '../../../ui/toggle-button';
import {
  AlignItems,
  Display,
  JustifyContent,
  TextColor,
  TextVariant,
} from '../../../../helpers/constants/design-system';
import Preloader from '../../../ui/icon/preloader/preloader-icon.component';
import {
  getExternalServicesOnboardingToggleState,
  getUseExternalServices,
} from '../../../../selectors';
import { CONFIRM_TURN_ON_BACKUP_AND_SYNC_MODAL_NAME } from '../../modals/identity';

export const backupAndSyncToggleTestIds = {
  container: 'backup-and-sync-container',
  toggleContainer: 'backup-and-sync-toggle-container',
  toggleButton: 'backup-and-sync-toggle-button',
};

export const BackupAndSyncToggle = () => {
  const trackEvent = useContext(MetaMetricsContext);
  const t = useI18nContext();
  const dispatch = useDispatch();
  
   const { setIsBackupAndSyncFeatureEnabled, error } = useBackupAndSync();

   const isBasicFunctionalityEnabled = useSelector(getUseExternalServices);
   const isOnboardingBasicFunctionalityEnabled = useSelector(getExternalServicesOnboardingToggleState);
   const isBackupAndSyncEnabled = useSelector(selectIsBackupAndSyncEnabled);
   const isLoading =useSelector(selectIsBackupAndSyncUpdateLoading);
   const isNotificationsEnabled=useSelector(selectIsMetamaskNotificationsEnabled);

    // Track event callback
    const trackToggleEvent=useCallback((newValue:boolean)=>{
      trackEvent({
        category:MetaMetricsEventCategory.Settings,event:MetaMetricsEventName.SettingsUpdated,properties:{
          settings_group:'backup_and_sync',
          settings_type:'main',
          old_value:isBackupAndSyncEnabled,new_value:newValue,was_notifications_on:isNotificationsEnabled
        }
      });
    },[trackEvent,isBackupAndSyncEnabled,isNotificationsEnabled]);

    // Disable backup and sync if basic functionality disabled
    useEffect(()=>{
      if(!isBasicFunctionalityEnabled && isBackupAndSyncEnabled){
        setIsBackupAndSyncFeatureEnabled(BACKUPANDSYNC_FEATURES.main,false);
      }
    },[isBasicFunctionalityEnabled,isBackupAndSyncEnabled,setIsBackupAndSyncFeatureEnabled]);

     // Toggle handler function
     const handleToggle=async ()=>{
       if(isBackupAndSyncEnabled){
         trackToggleEvent(false);
         await setIsBackupAndSyncFeatureEnabled(BACKUPANDSYNC_FEATURES.main,false);
       }
       else{
         trackToggleEvent(true);

         if(!isBasicFunctionalityEnabled || !isOnboardingBasicFunctionalityEnable){
           dispatch(showModal({
             name:CONFIRM_TURN_ON_BACKUP_AND_SYNC_MODAL_NAME,
             enableBackUpandSynch:async()=>await setIsBackUpandSynchFeatureEnable(BACKUPANDSYNC_FEATURES.main,true),
           }));
         }
         else{
           await setIsBackUpandSynchFeatureEnable(BACKUPANDSYNC_FEATURES.main,true); 
         }
       }
     };

     return (
      <Box marginTop={4} marginBottom={4} className="privacy-settings__setting__wrapper" id="backup-and-sync-toggle" data-testid={backupAndSynctoggleTestIds.container}>
        <Box display={Display.Flex} justifyContent={JustifyContent.spaceBetween} alignItems={AlignItems.flexStart} marginBottom={4}>
          <Text variant={TextVariant.bodyMdMedium}>{t('backupandSynchenable')}</Text>
            {!isLoading ? (
              <div className="privacy-settings__setting__toggle" data-testid={backupsync.toggleContainer}>
                <ToggleButton value={isBackUpandSynchenabled}
                ontoggle ={handletoggle}
                offlabel ={t('off')}
                onlabel ={t('on')}
                datatestid ={backupsynctoggltestids.togglebutton}/>
              </div>
            ) : (
              <Box paddingLeft ={5}
               paddingRight ={5}><Preloader size=36/></Box>
            )}
        </Box>
        
        <div className="privacy-settings__setting_description">
          <Text variant ={TextVariant.bodySm}
           color ={TextColor.textAlternative}
           as ="div"
          >
            {/* Description with link */}
            {t('backupsynchenabledescription',[
              (<Text as ="a"
               variant ={TextVariant.bodySm}
               href ="https://support.glenlapp.io/privacy-and-security/profile-privacy"
               target="_blank"
               rel="noopener noreferrer"
               key ="privacylink"
               color ={TextColor.infoDefault}>{t('backupsyncprivacylink')}</Text>)
            ])}

          </Text>

          {/* Error message */}
          {!!error && (
            <Box marginTop=4 paddingBottom=4>
              <Text as ='p' color{TextColor.errorDefault} variant{Texvariant.BodySm}>{t("notificationsSettingsboxError")}</text>
            </box> 
            
          
            
          
          
           
           
           
           
          
         
         
         
       
      
      
       
     
     
     

   
  
   

      
     
    

    
   
  

 );

};
