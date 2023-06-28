// App logic.
ons.platform.select('android');
window.myApp = {};


document.addEventListener('init', function(event) {

  $(document.body).css("background-color","white !important");
  $('.page__background').css("opacity","1");

  var page = event.target;

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }  
  
});


document.addEventListener('show', function(event) {

  
  
  var page = event.target;

  // Each page calls its own initialization controller.
  
  if (page.id === "loginpage") {
    startscreen.hide();
    page.onDeviceBackButton = onBackButton;
    //ons.enableDeviceBackButtonHandler();   
  }

  if (page.id === "verifypage") {
    page.onDeviceBackButton = onBackButton;
    //page.onDeviceBackButton = onBackButton;
    //ons.enableDeviceBackButtonHandler();   
  }
  
  if(page.id === "mappage"){
    
    //$("#ride-request").show();
    selected_state_id = "0"; //reset inter-state booking    
    if(device_ready)ons.enableDeviceBackButtonHandler();      
      

  }

  


  if(page.id === 'profilepage'){

        
    

  }


  if(page.id === 'signuppage'){
        //configure cropit
        jQuery('#image-editor').cropit({
          /* smallImage:'stretch', */
          allowDragNDrop:false,
        /*  width:300,
          height:300, */
          exportZoom:2,
          freeMoveboolean: true,
          onImageLoaded: function(){
            //$('.cropit-preview').css('background-image','none');
            var current_image = $('.cropit-preview').css('background-image');
            $('.cropit-preview').css('background-image','none');
            $('.cropit-preview-image-container').css('visibility','visible');
            
            var imageData = jQuery('#image-editor').cropit('export', {
              type: 'image/jpeg',
              quality: .9                    
            });
            if(!imageData){

              ons.notification.toast(__("Invalid photo selected"),{
                timeout: 1000
              });

              driver_registration_data.driver_photo = '';
              $('.cropit-preview-image-container').css('visibility','hidden');
              $('.cropit-preview').css('background-image',current_image);
              $('.cropit-image-input').val('');
              return;
              
            }

            driver_registration_data.driver_photo = imageData;
                        

          }          
      });

      if(driver_registration_data.driver_photo){
        $(".cropit-preview").css('background-image', `url(${driver_registration_data.driver_photo})`);
      }

      $('.select-image-btn').off('click').on('click',function() {
          $('.cropit-image-input').click();
      });
  }


  if(page.id === 'vehicledetailsregpage'){

      
      $('#carmake').val(driver_registration_data.car_model);
      $('#lplatenum').val(driver_registration_data.car_plate_num);
      //$('#regnum').val(driver_registration_data.car_reg_num);
      if(driver_registration_data.car_color){
        $('#paintcolor').find(`option[value=${driver_registration_data.car_color}]`).prop('selected', true);
      }

      $('#select-drv-license-image-btn').off('click').on('click',function() {
          $('#driver-license-file-input').click();
      });

      $('#driver-license-file-input').off('change').on('change',function(event){
        readImgFile(event,function(result){
            if(result.error){
              $('#driver-license-image').attr('src','img/drv-license.png');
              driver_registration_data.drivers_license_photo = '';
              ons.notification.alert(result.error_msg,{title:""});
              return;
            }

            $('#driver-license-image').attr('src',result.data);
            driver_registration_data.drivers_license_photo = result.data;

          });
      });

      if(driver_registration_data.drivers_license_photo){
        $('#driver-license-image').attr('src',driver_registration_data.drivers_license_photo);
      }


      $('#select-road-worth-image-btn').off('click').on('click',function() {
          $('#road-worth-file-input').click();
      });

      $('#road-worth-file-input').off('change').on('change',function(event){
        readImgFile(event,function(result){
            if(result.error){
              $('#road-worth-image').attr('src','img/drv-license.png');
              driver_registration_data.road_worthiness_cert = '';
              ons.notification.alert(result.error_msg,{title:""});
              return;
            }

            $('#road-worth-image').attr('src',result.data);
            driver_registration_data.road_worthiness_cert = result.data;

          });
      });

      if(driver_registration_data.road_worthiness_cert){
        $('#road-worth-image').attr('src',driver_registration_data.road_worthiness_cert);
      }

  }

  if(page.id === 'softwarelicense'){
    loading.hide();
  }


  if(page.id === 'bankdetailspage'){

      $('#acc-holders-name').val(driver_registration_data.account_holders_name);
      $('#acc-number').val(driver_registration_data.account_number);
      $('#ref_code').val(driver_registration_data.referal_code);

      if(driver_registration_data.bank_code){
        var bank_on_list = $('#banklist').find(`option[value=${driver_registration_data.bank_code}]`);
        
        if(bank_on_list.length){
          bank_on_list.prop('selected', true);
        }else{
          $('#banklist').find('option[value=xxx]').prop('selected', true);
          $('#other-bank-name').show();
          $('#other-bank-code').show();

          $('#bank-name').val(driver_registration_data.bank_name);
          $('#bank-code').val(driver_registration_data.bank_code);
        }
      }

      
      $('#bank-swift').val(driver_registration_data.bank_swift_code);

      $('#banklist').off('change').on('change', function(){

          var selected_bank_code = $('#banklist').find(':selected').val();
          var selected_bank_name = $('#banklist').find(':selected').text();
          

          if(selected_bank_code === 'xxx'){
            $('#other-bank-name').fadeIn();
            $('#other-bank-code').fadeIn();
          }else{
            $('#other-bank-name').fadeOut();
            $('#other-bank-code').fadeOut();
          }


      });



      
  }





  if(page.id === 'notificationspage'){
    getnotifications();
    $('#notifications-refresh').on('click', function(){
      getnotifications();
    })
  }


  if(page.id === 'walletpage'){

    getwalletinfo();

       
    
  }


    
  

  $('.page__background').css("opacity","0");
  $(document.body).css("background-color","");
  
});













document.addEventListener('hide', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (page.id === "loginpage") {
    ons.enableDeviceBackButtonHandler();    
  }

  if(page.id === "mappage"){
    //ons.enableDeviceBackButtonHandler();
  }


  
});









function getuserinfopages(){

  loading.show();  
  var post_data = {'action_get':'getuserinfopages'};       
  jQuery.ajax({
  url: ajaxurl,
  method: 'GET',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
                   
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
              
              return;
          }

          if(data_obj.hasOwnProperty('error')){

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            $('#privacy-content').html(data_obj.terms); 
            $('#aboutpage-content').html(data_obj.about); 
            terms_and_privacy_content = data_obj.terms; 
            aboutpage_content = data_obj.about;   
            return;
          }


        
          
          
      },
      error: function() {
        loading.hide();
        ons.notification.toast(__('Error communicating with server'), {
          timeout: 2000
        });          
        return;
          
      }

  });



}



function gethelpdata(){

  loading.show();  
  var post_data = {'action_get':'gethelpdata'};       
  jQuery.ajax({
  url: ajaxurl,
  method: 'GET',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
                   
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
              
              return;
          }

          if(data_obj.hasOwnProperty('error')){

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            help_topics = data_obj.help_cat_topics;
            help_categories = data_obj.help_cat;                         
            $('#help-cat-content').html(help_categories);
            return;
          }


        
          
          
      },
      error: function() {
        loading.hide();
        ons.notification.toast(__('Error communicating with server'), {
          timeout: 2000
        });          
        return;
          
      }

  });



}



function gethelpcontent(id){

  loading.show();  
  var post_data = {'action_get':'gethelpcontent','id':id};       
  jQuery.ajax({
  url: ajaxurl,
  method: 'GET',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
                   
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
              
              return;
          }

          if(data_obj.hasOwnProperty('error')){

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            help_topics_contents[id] = data_obj.help_content;   
            $('#help-content').html(help_topics_contents[id]);
            return;
          }


        
          
          
      },
      error: function() {
        loading.hide();
        ons.notification.toast(__('Error communicating with server'), {
          timeout: 2000
        });          
        return;
          
      }

  });



}



function getwalletinfo(suppress_alerts){
      loading.show();
      if(!suppress_alerts){
        //ons.notification.toast(__('Updating wallet items...'), {
          //timeout: 2000
        //});
      }

      var post_data = {'action':'getwalletinfo'};       
      jQuery.ajax({
      url: ajaxurl,
      method: 'POST',
      timeout : 10000,
      crossDomain:true,
      xhrFields: {withCredentials: true},
      data: post_data,
      success: function (data, status)
          {
                
              //console.log(data);
              
              loading.hide(); 
              try{
                  var data_obj = JSON.parse(data);
              }catch(e){
                if(suppress_alerts != 1){
                  ons.notification.toast(__('Error communicating with server'), {
                    timeout: 2000
                  });
                }
                  return;
              }

  
              if(data_obj.hasOwnProperty('error')){
                if(suppress_alerts != 1){
                  ons.notification.alert(data_obj.error,{title:""});
                }
                  return;                  

              }


              
              if(data_obj.hasOwnProperty('success')){
                if(!suppress_alerts){
                 // ons.notification.toast(__('Wallet items updated'), {
                   // timeout: 2000
                 // });
                }

                wallet_amount = data_obj.wallet_amt;                
                wallet_history_items = data_obj.wallet_history;
                wallet_debit_history = data_obj.wallet_earning;
                wallet_withdrawal_enable = data_obj.withdrawenabled;
                wallet_withdrawal_message = data_obj.withdrawmessage;

                if(data_obj.hasOwnProperty('driver_min_wallet_balance')){
                  if(parseFloat(data_obj.driver_min_wallet_balance) >=  wallet_amount){
                    ons.notification.alert(__("Your wallet balance is low. Please add money to your wallet to receive ride requests"),{title:"", cancelable:false});
                  }
                }


                if(wallet_history_items !== ""){
                  $('#wallethistoryitems').html("<ons-list>" + wallet_history_items + "</ons-list>");
                }else{
                  $('#wallethistoryitems').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                }

                if(wallet_debit_history !== ""){
                  $('#walletdhistoryitems').html("<ons-list>" + wallet_debit_history + "</ons-list>");
                }else{
                  $('#walletdhistoryitems').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                }

                var wallet_amount_currency_converted = wallet_amount * city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
                wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;
            
                $('#walletbal').html(city_curency_symbol + wallet_amount_currency_converted); //show amount

                if(wallet_withdrawal_enable == 1){
                  $("#withdrawalsection").show();
                }else{
                  $("#withdrawalsection").hide();
                }
                
                $("#withdrawmessage").html(wallet_withdrawal_message);
            
                                
                return;
              }


            
              
              
          },
          error: function() { 
            loading.hide();
            if(suppress_alerts != 1){
              ons.notification.toast(__('Error communicating with server'), {
                timeout: 2000
              });
            }
            return;
              
          }

      });



}


function getbookings(){
  loading.show();
  ons.notification.toast(__('Updating trip history...'), {
    timeout: 1500
  });
    var post_data = {'action_get':'getDriverHistory'};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 20000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            loading.hide();     
            console.log(data);
            
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
              
                ons.notification.alert(__("Error communicating with server"),{title:""});
              
                return;
            }


            if(data_obj.hasOwnProperty('error')){
              
                ons.notification.alert(data_obj.error,{title:""});
              
                return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
              ons.notification.toast(__('Trip history updated'), {
                timeout: 2000
              });              
              
              bookings_data['pend_onride'] = data_obj.pend_onride;
              bookings_data['completed'] = data_obj.booking_comp;
              bookings_data['cancelled'] = data_obj.booking_canc;

              
              if(data_obj.pend_onride !== ""){
                $('#booking-pend-onride').html(data_obj.pend_onride);

                //check for uncompleted booking data on locastorage and enable the resume button for only bookings available
                for (var key in localStorage) {

                  let booking_key = key.substr(0,4);

                  if(booking_key == "pbk-"){
                    let booking_id = key.substr(4);
                    let booking_data = localStorage.getItem(key);
                    
                    if(booking_data.length){
                      $('#resume-bk-' + booking_id).show();                      
                    }
                  }
                                    
                 
                }

              }else{
                $('#booking-pend-onride').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }


              if(data_obj.booking_comp !== ""){
                $('#booking-comp').html(data_obj.booking_comp);
              }else{
                $('#booking-comp').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }

              if(data_obj.booking_canc !== ""){
                $('#booking-canc').html(data_obj.booking_canc);
              }else{
                $('#booking-canc').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }
                                            
              return;

            }


          
            
            
        },
        error: function() { 
          loading.hide();
          ons.notification.alert(__("Error communicating with server"),{title:""});
          return;
            
        }

    });



}



function getDriverOnride(){
  //  loading.show();
  ons.notification.toast('Updating jobs information...', {
    timeout: 2000
  });
    var post_data = {'action_get':'getDriverOnride'};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            //loading.hide();     
            console.log(data)
            try{
                //console.log(data);
                var data_obj = JSON.parse(data);
            }catch(e){
              
                ons.notification.alert("Failed to get jobs information. Please try again.",{title:""});
              
                return;
            }


            if(data_obj.hasOwnProperty('error')){
              
                ons.notification.alert(data_obj.error);
              
                return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
                          
            
              //update the page
              jobs_data.onride =  data_obj.booking_onride;
              jobs_data.accepted = data_obj.booking_accepted;
              jobs_data.pending = data_obj.booking_pend;
              $('#booking-onride').html(jobs_data.onride);
              $('#booking-accepted').html(jobs_data.accepted);  
              $('#booking-pending').html(jobs_data.pending);
              
              ons.notification.toast('Jobs information updated.', {
                timeout: 2000
              });
              return;
            }

      
        },
        error: function() { 
          //loading.hide();
          ons.notification.alert("Failed to get jobs information. Please try again.",{title:""});
          return;
            
        }

    });




}







function getnotifications(notify){
  $('#notification-item-list').html(notifications_data);
  if(!notify){
    ons.notification.toast(__('Updating notifications...'), {
      timeout: 2000
    });
  }
    var post_data = {'action':'getusernotifications'};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            loading.hide();     
            console.log(data);
            
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                if(!notify){
                  ons.notification.alert(__("Error communicating with server"),{title:""});
                }
              
                return;
            }


            if(data_obj.hasOwnProperty('error')){
              if(!notify){
                ons.notification.alert(data_obj.error,{title:""});
              }
              return;                  

            }

            if(data_obj.hasOwnProperty('nodata')){
              /* if(!notify){
                ons.notification.alert(data_obj.nodata,{title:""});
              } */
              notifications_data = "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>";
              $('#notification-item-list').html(notifications_data);
              return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
              if(!notify){
                ons.notification.toast(__('Notifications updated'), {
                  timeout: 2000
                });
              }
              notifications_data = data_obj.notifications;
              $('#notification-item-list').html(data_obj.notifications);
              if(notify){
                var stored_n_count = localStorage.getObject('n_count');
                if(parseInt(data_obj.n_count) > stored_n_count){
                  $('#notification-icon').css('color','red');
                }else{

                  $('#notification-icon').css('color','white');
                }
                
              }else{
                $('#notification-icon').css('color','white');
                localStorage.setObject('n_count',data_obj.n_count);
              }                                                      
              return;

            }


          
            
            
        },
        error: function() { 
          loading.hide();
          if(!notify){
            ons.notification.alert(__("Error communicating with server"),{title:""});
          }
          return;            
        }

    });


}




function getEarning(earning_date){
  loading.show();
  ons.notification.toast(__('Getting earnings data'), {
    timeout: 2000
  });
            
  var post_data = {'action':'getEarnings','date':earning_date};       
  
  jQuery.ajax({
  url: ajaxurl,
  method: 'POST',
  timeout : 10000,
  crossDomain:true,
  xhrFields: {withCredentials: true},
  data: post_data,
  success: function (data, status)
      {
        loading.hide();
        console.log(data);
        loading.hide();    
                            
          
          try{
              var data_obj = JSON.parse(data);
          }catch(e){
            
            ons.notification.toast(__('Error communicating with server'), {
              timeout: 2000
            });
            return
          }


          if(data_obj.hasOwnProperty('error')){
            
              ons.notification.alert(data_obj.error,{'title':""});
              return;                  

          }


          
          if(data_obj.hasOwnProperty('success')){ 
                               
            earnings_data = data_obj.earnings_data;
            day_total_earnings = data_obj.all_day_earning;
            $("#day-earnings").html(earnings_data);
            
            if(day_total_earnings != ''){
              $("#day-total-earning").html(day_total_earnings);
            }else{
              $("#day-total-earning").html("0.00");
            }

            ons.notification.toast(__('Earnings data updated'), {
              timeout: 2000
            });

            return;

          }


        
          
          
      },
      error: function() {
        loading.hide();     
        ons.notification.alert(__("Error communicating with server"),{'title':""});
        return;
          
      }

  });


}





function AnimateAtStart(){
  
  app_start_animate = 1;

 app_start_animate_timer = setInterval(function(){
    app_start_animate_counter++;

    if(app_start_animate_counter == 5){
      
      $("#menubtn").css("visibility","visible");
      $("#menubtn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
      })

    }


    if(app_start_animate_counter == 6){
      $("#mylocationbtn").css("visibility","visible");
      $("#mylocationbtn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
        
        
      })

    }
    
    
    

    if(app_start_animate_counter == 20){
      clearInterval(app_start_animate_timer);
      app_start_animate_counter = 0;
    }

  },100);


}
