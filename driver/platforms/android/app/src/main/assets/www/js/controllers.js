/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

window.myApp = {};



myApp.controllers = {

  //////////////////////////
  //Page Controller: Runs code for each page pushed to the navigator  //
  //////////////////////////
  

  mappage: function(page) {

    
     
               
    
    // Set button functionality to open/close the menu.
    page.querySelector('#menubtn').onclick = function() {

      
      $('#user-menu-photo').attr('src',userprofileinfo.photo);
      
      document.querySelector('#mySplitter').left.toggle();
      document.querySelector('#users-name').innerHTML = userprofileinfo.firstname + " " + userprofileinfo.lastname;
      var wallet_amount_currency_converted = wallet_amount * city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
      wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;      
      document.querySelector('#users-wallet').innerHTML = __("Wallet Balance") + ": " + city_curency_symbol + wallet_amount_currency_converted;      
      
    };


    

    



    document.querySelector('#mySplitter').addEventListener('preopen', function(event) {
      side_menu_state = 1;
    });


    document.querySelector('#mySplitter').addEventListener('preclose', function(event) {
      side_menu_state = 0;
    })
    
    

    

    
    
  },


  notificationspage: function(page){
    translateElements('notifpg');
    $('#notification-item-list').html(notifications_data);

  },

  earnings: function(page){

    translateElements('earngs');
    
    $("#day-earnings").html(earnings_data);
    
    if(day_total_earnings != ''){
      $("#day-total-earning").html(day_total_earnings);
    }

    var month_names = [
      __("January"), __("February"), __("March"),
      __("April"), __("May"), __("June"), __("July"),
      __("August"), __("September"), __("October"),
      __("November"), __("December")
    ];

    var current_dt = new Date();
                
    var c_year = current_dt.getFullYear();
    var c_month = current_dt.getMonth() + 1;
    var c_day = current_dt.getDate();
    /* var c_day_week = current_dt.getDay();
    var c_hours = current_dt.getHours();
    var c_min = current_dt.getMinutes(); */

    /* if(c_hours < 10){
      c_hours = '0' + c_hours;
    }

    if(c_min < 10){
      c_min = '0' + c_min;
    } */


    if(c_day < 10){
      c_day = '0' + c_day;
    }

    if(c_month < 10){
      c_month = '0' + c_month;
    }

    //$('#earning-day').html(month_names[c_month-1] + ' ' + c_day + ', ' + c_year);

    getEarning(c_year + '-' + c_month + '-' + c_day);

    //getEarning('2019-01-21');

    $('#sel-earning-day').off("click").on('click', function(){
      if(device_ready){
          cordova.plugins.DateTimePicker.show({
            mode : "date",
            date : cdate,
            allowOldDates : true,
            allowFutureDates : false,
            minuteInterval : 10,
            local : "EN",
            okText : __("OK"),
            cancelText : __("Cancel"),
            android : {
                        theme : 0,
                        calender : true,
                        is24HourView : false
            },
            success : function(newDate){
                    cdate = newDate;
                    current_dt = [];
                    current_dt = new Date(newDate);
                    var c_year = current_dt.getFullYear();
                    var c_month = current_dt.getMonth() + 1;
                    var c_day = current_dt.getDate();
                    var c_day_week = current_dt.getDay();
                    var c_hours = current_dt.getHours();
                    var c_min = current_dt.getMinutes();

                    if(c_hours < 10){
                      c_hours = '0' + c_hours;
                    }

                    if(c_min < 10){
                      c_min = '0' + c_min;
                    }


                    if(c_day < 10){
                      c_day = '0' + c_day;
                    }

                    if(c_month < 10){
                      c_month = '0' + c_month;
                    }

                    

                    $('#earning-day').html(month_names[c_month-1] + ' ' + c_day + ', ' + c_year);

                    getEarning(c_year + '-' + c_month + '-' + c_day);
                    
                    
            },
            cancel : function(){
                return;
            },
            error: function(){
                return;
            }
        })
      }

    });

  },

  loginpage: function(page){
    /* alert("loaded"); */
    translateElements('login');

    let lang_str = "";
    available_langs.forEach(function(val,indx){
      let opt_sel = '';
      if(val.code == selected_lang.code){
        opt_sel = "selected";
      }
      lang_str += `<option value='${indx}' ${opt_sel} >${val.name}</option>`;
    })

    $('#lang-select2').html(lang_str);

    $('#lang-select2').off('change').on('change', function(e){
      e.preventDefault();
      let sel_lang_indx = $(this).val();
      selected_lang = available_langs[sel_lang_indx];
      localStorage.setObject('lang',selected_lang);
      //let lang_el = document.getElementById('lang-el');
      //lang_el.src = `js/lang/${selected_lang.code}.js`;
      $('#login-lang').text($(this).find(':selected').text());
      //restart App
      ons.notification.alert(__("Restart App"), {title:"",buttonLabels:['OK'],callback: function(){
        window.location.reload();
        return;
      }});

    })


    $('#login-lang').text($('#lang-select2').find(':selected').text());

    
    if(carrier_country_code){
      var dial_code = $("li[data-country-code='" + carrier_country_code + "']").data('dial-code');
      if(dial_code){          
          user_country_dial_code = dial_code;
          $('#country-flag').attr('class', 'iti__flag iti__' + carrier_country_code);
          $('#country-flag').data('country', carrier_country_code)
          $('#tel-code').html(' +' + dial_code);
          $('#tel-code').data('dialcode', dial_code);

      }
    }
  },



  signuppage: function(page){
    /* alert("loaded"); */
    translateElements('signup');

    $('#firstname').val(driver_registration_data.firstname);
    $('#lastname').val(driver_registration_data.lastname);
    $('#address').val(driver_registration_data.address);
    $('#phone').val(driver_registration_data.phone);
    $('#reg_email').val(driver_registration_data.email);
    $('#reg_password').val(driver_registration_data.password);
    $('#reg_rpassword').val(driver_registration_data.password);
    

    if(driver_registration_data.country_2c_code){
      $('#country-flag-reg').attr('class', 'iti__flag iti__' + driver_registration_data.country_2c_code);
      $('#tel-code-reg').html(' +' + driver_registration_data.country_call_code);
    }else{
      if(carrier_country_code){
        var dial_code = $("li[data-country-code='" + carrier_country_code + "']").data('dial-code');
        if(dial_code){          
            user_country_dial_code = dial_code;
            $('#country-flag-reg').attr('class', 'iti__flag iti__' + carrier_country_code);
            $('#country-flag-reg').data('country', carrier_country_code)
            $('#tel-code-reg').html(' +' + dial_code);
            $('#tel-code-reg').data('dialcode', dial_code);
  
        }
      }
    }
  },

  
  aboutapp : function(page){
    translateElements('aboutapp');
    if(!aboutpage_content == ''){
      $('#aboutpage-content').html(aboutpage_content);
      return;
    }
    
    getuserinfopages();
    
  },

  walletpage : function(page){
    translateElements('walletpg'); 
  },


  walletbalance: function(page){
    translateElements('walletbl'); 
    var wallet_amount_currency_converted = wallet_amount * city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
    wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;

    $('#walletbal').html(city_curency_symbol + wallet_amount_currency_converted); //show amount    

    if(app_settings.default_payment_gateway == 'paymob'){
        $('#kiosk-mode-option').show();
    }else{
      $('#kiosk-mode-option').hide();
    }
    
    let topup_buttons_html = '';
    if(app_settings.wallet_topup_presets == ''){
        $('#wallet-preset-buttons').hide();
    }else{
      let wallet_topup_preset_string = app_settings.wallet_topup_presets;
      let wallet_topup_preset_array = wallet_topup_preset_string.split('|');
      if(typeof wallet_topup_preset_array == 'object'){
        
        wallet_topup_preset_array.forEach(function(val,indx){
          let topup_amount = val.trim();
          if(indx < 4){
            topup_buttons_html += `<ons-button style="border: thin solid #ccc;margin-right:10px;" onclick="$('#fundAmount').val('${topup_amount}');Vpay();" modifier="outline">${topup_amount}</ons-button>`;
          }
          
        })
        $('#wallet-preset-buttons').html(topup_buttons_html);
      }else{
        $('#wallet-preset-buttons').hide();
      }
    }
    
  },

  termsandprivacy: function(page){
    translateElements('termsp'); 
      if(!terms_and_privacy_content == ''){
        $('#privacy-content').html(terms_and_privacy_content);
        return;
      }
      
      getuserinfopages();
  },

 

  helpcategories: function(page){
      translateElements('helpcat'); 
      if(!help_categories == ''){
        $('#help-cat-content').html(help_categories);
        return;
      }
      
      gethelpdata();
  },

  softwarelicense: function(){
    translateElements('softlice');
  },

  infopage  : function(){
    translateElements('infopg'); 
  },

  helptopics: function(page){
    $('#help-topics-title').html(page.data.page_title);
    $('#help-topics-content').html(page.data.topics_list);
    return;
  }
  ,

  helpcontent: function(page){
    $('#help-content-title').html(page.data.help_content_title);
    if(typeof help_topics_contents === 'object' && help_topics_contents.hasOwnProperty(page.data.help_content_id)){
      $('#help-content').html(help_topics_contents[page.data.help_content_id]);
      return;
    }

    gethelpcontent(page.data.help_content_id);
      
  },


  profilepage:function(page){

    translateElements('profpg');
    
    //handle language selector
    let lang_str = "";
    available_langs.forEach(function(val,indx){
      let opt_sel = '';
      if(val.code == selected_lang.code){
        opt_sel = "selected";
      }
      lang_str += `<option value='${indx}' ${opt_sel} >${val.name}</option>`;
    })

    $('#lang-select').html(lang_str);

    $('#lang-select').off('change').on('change', function(e){
      e.preventDefault();
      let sel_lang_indx = $(this).val();
      selected_lang = available_langs[sel_lang_indx];
      localStorage.setObject('lang',selected_lang);
      //let lang_el = document.getElementById('lang-el');
      //lang_el.src = `js/lang/${selected_lang.code}.js`;

      //restart App
      ons.notification.alert(__("Restart App"), {title:"",buttonLabels:['OK'],callback: function(){
        window.location.reload();
        return;
      }});

    })

    if(typeof userprofileinfo === 'object'){        
      
      $('#firstname').html(userprofileinfo.firstname);
      $('#lastname').html(userprofileinfo.lastname);
      $('#email').val(userprofileinfo.email);
      $('#address').html(userprofileinfo.address);
      $('#phone').val(userprofileinfo.phone);
      $('#carcat').val(userprofileinfo.carcat);
      $('#city').val(userprofileinfo.city);
      $('#refcode_info').html(userprofileinfo.ref_code);
      $('#driver-rating').attr("src","img/rating-" + userprofileinfo.driver_rating + ".png");
      $('#driver-photo').css('background-image','url('+ userprofileinfo.photo + ')');

      if(userprofileinfo.country_code){
        var dial_code = $("li[data-country-code='" + userprofileinfo.country_code + "']").data('dial-code');
        if(dial_code){          
            user_country_dial_code = dial_code;
            $('#country-flag-profile').attr('class', 'iti__flag iti__' + userprofileinfo.country_code);
            $('#country-flag-profile').data('country', userprofileinfo.country_code)
            $('#tel-code-profile').html(' +' + dial_code);
            $('#tel-code-profile').data('dialcode', dial_code);
  
        }
      }

      //******************************* FOR DEMO ****************************** */  
      var option_vals = '';

      var city_ids = routetariffs.result.city_id;
      var city_names = routetariffs.result.city_name;
      
      city_ids.forEach(function(value,index){
          var selected = city_names[index] == userprofileinfo.city ? "selected" : '';
          option_vals += "<option value='" + value + "' " + selected + " >" + city_names[index] + "</option>"
      });

      $('#op-city').html(option_vals);

      var default_sel_id = $('#op-city').find(':selected').val(); 

      var city_cars =  routetariffs.result[default_sel_id].cars;

      option_vals = '';

      for(var key in city_cars){
          var selected = city_cars[key].ride_type == userprofileinfo.carcat ? "selected" : '';
          option_vals += "<option value='" + city_cars[key].ride_id + "' " + selected + " >" + city_cars[key].ride_type + "</option>"
          
      }
              
      $('#car-cat').html(option_vals);

      
      


      $('#op-city').on('change', function(){

        var default_sel_id = $('#op-city').find(':selected').val(); 

        var city_cars =  routetariffs.result[default_sel_id].cars;

        var option_vals = '';

        for(var key in city_cars){
            
          option_vals += "<option value='" + city_cars[key].ride_id + "' >" + city_cars[key].ride_type + "</option>"
            
        }
                
        $('#car-cat').html(option_vals);

        
           
      })

      
      return;
    }

    /* loading.show();
    var post_data = {'action':'getuserprofileinfo'};       
        jQuery.ajax({
        url: ajaxurl,
        method: 'POST',
        timeout : 15000,
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
                    ons.notification.alert("Error occured. Please retry.",{title:""});
                    return;
                }
    
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(data_obj.error,{title:""});
                    return;
                }
  

                
                if(data_obj.hasOwnProperty('success')){ 
                    console.log(data_obj);
                    userprofileinfo = JSON.parse(data);
                    $('#firstname').val(userprofileinfo.firstname);
                    $('#lastname').val(userprofileinfo.lastname);
                    $('#email').val(userprofileinfo.email);
                    //$('#address').val(userprofileinfo.address);
                    $('#phone').val(userprofileinfo.phone);
                    return;
                }


               
                
                
            },
            error: function() {                                
                
              ons.notification.alert("Error occured. Please retry.",{title:""});
              return;
                
            }

        }); */

  },

  ridecomplete: function(page){
    translateElements('ridecomp');   
    $('.rate-star').off('click').on('click', function(){
        var star_level = $(this).data('level');
        switch(star_level){
            case 1:
            ride_rating = 1;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');        
            break;
    
            case 2:
            ride_rating = 2;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');      
            break;
    
            case 3:
            ride_rating = 3;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');
            $('#star-level-3').css('color','yellow');        
            break;
    
            case 4:
            ride_rating = 4;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');
            $('#star-level-3').css('color','yellow');
            $('#star-level-4').css('color','yellow');        
            break;
    
            case 5:
            ride_rating = 5;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');
            $('#star-level-3').css('color','yellow');
            $('#star-level-4').css('color','yellow');
            $('#star-level-5').css('color','yellow');        
            break;
    
        }
    
    });

    $('#rate-rider-image').attr('src',page.data.comp_data.rider_image); //load driver image
    $('#rate-rider-name').html(page.data.comp_data.rider_firstname); //load driver firstname
    $('#rate-button').data('bookingid',page.data.comp_data.booking_id); ////load ride rating action button data
    $('#ride-complete-amount').html(city_curency_symbol + page.data.comp_data.paid_amount); ////load amount of the ride
      
    if(page.data.comp_data.payment_type == 1){
      $('#ride-complete-ptype').html(__("Cash Payment")); ////load payment type of the ride
    }else if(page.data.comp_data.payment_type == 2){
      $('#ride-complete-ptype').html(__("Wallet Payment")); ////load payment type of the ride
    }else if(page.data.comp_data.payment_type == 3){
      $('#ride-complete-ptype').html(__("Card Payment")); ////load payment type of the ride
    }else{
      $('#ride-complete-ptype').html("POS Payment"); ////load payment type of the ride
    }
    
    $('#ride-complete-stats-dist').html(page.data.comp_data.total_ride_distance_formated);
    $('#ride-complete-stats-time').html(page.data.comp_data.total_ride_time_formated);

  },

  bookingpage: function(){
    translateElements('bookingpg');   
    getbookings();
   
  },




  bookingpagecurrent: function(){
    $('#booking-pend-onride').html(bookings_data['pend_onride']);
  },


  bookingpagecomplete: function(){
    $('#booking-comp').html(bookings_data['completed']);
  },


  bookingpagecancel: function(){
    $('#booking-canc').html(bookings_data['cancelled']);
  },


  bookingdetails: function(page){
    //alert(page.data.bookid);
    translateElements('bookingdets');
    var booking_details_data = JSON.parse($('#booking-list-item-data-' + page.data.bookid).html());
    //console.log(booking_details_data);
    if(booking_details_data.hasOwnProperty('booking_cost')){
      $('#bookride_cost').html(booking_details_data.booking_cost);
    }

    if(booking_details_data.hasOwnProperty('booking_id')){
      $('#booking-details-title').html(__('Trip') + ': #' + booking_details_data.booking_id);
    }

    if(booking_details_data.hasOwnProperty('car_type')){
      $('#selected-ride').html(booking_details_data.car_type);
    }

    if(booking_details_data.hasOwnProperty('d_location')){
      $('#drop-off-address').html(booking_details_data.d_location);
    }


    if(booking_details_data.hasOwnProperty('p_location')){
      $('#pick-up-address').html(booking_details_data.p_location);
    }

    if(booking_details_data.hasOwnProperty('pick_up_time')){
      $('#puc_dt').html(booking_details_data.pick_up_time);
    }


    if(booking_details_data.hasOwnProperty('payment_type')){
      $('#payment-type').html(booking_details_data.payment_type);
    }


    if(booking_details_data.hasOwnProperty('car_image')){
      $('#route-ride-image').attr("src",booking_details_data.car_image);
    }


    if(booking_details_data.hasOwnProperty('car_desc')){
      $('#route-ride-desc').html(booking_details_data.car_desc);
    }

    if(booking_details_data.hasOwnProperty('coupon_code') && booking_details_data.coupon_code !== null){
      $('#coupon-code').html(booking_details_data.coupon_code);
    }

    
    if(booking_details_data.hasOwnProperty('user_firstname')){
            
      if(booking_details_data.user_firstname !== 'N/A'){
          $('.user-details').show();
          $('#user-name').html(booking_details_data.user_firstname);
          
          if(booking_details_data.hasOwnProperty('user_image')){
            $('#user-image-preload').attr("src",booking_details_data.user_image);
          }
          
          if(booking_details_data.hasOwnProperty('user_rating')){
            $('#user-rating').attr("src","img/rating-" + booking_details_data.user_rating + ".png");
          }

      }      
    }

    if(booking_details_data.hasOwnProperty('driver_earning')){
            
      
        $('.earning-details').show();
        $('#earned-amount').html(booking_details_data.driver_earning);
        
        
          
    }

    if(booking_details_data.hasOwnProperty('booking_status')){    

        if(booking_details_data.booking_status == 3){
            $('.trip-completed').show(); 
            if(booking_details_data.hasOwnProperty('distance_travelled')){
              $('#trip-distance').html(booking_details_data.distance_travelled);
            } 

            if(booking_details_data.hasOwnProperty('paid_amount')){
              $('#bookride_cost').html(booking_details_data.paid_amount);
            }
            
            if(booking_details_data.hasOwnProperty('ride_duration')){
              $('#trip-duration').html(booking_details_data.ride_duration);
            }

        }
    }

       

    

  },

  verifypage : function(){
    translateElements('verifypg');
  },

  verifyphonepage : function(page){
    translateElements('verifyphone');
    $('#resend-phone-code-btn').data('phonenumber',page.data.phone_num);
      
      //initiate resend code button activate countdown
      clearInterval(resend_code_countdown_timer_handle);
      var countdown = RESEND_CODE_COUNTDOWN_VALUE;
      resend_code_btn_status = 0;
      $('#resend-phone-code-btn').text(__('Resend Code') + " " + countdown);
      resend_code_countdown_timer_handle = setInterval(function(){
        countdown--;
        if(countdown < 1){
            countdown = 0;
            resend_code_btn_status = 1;
            $('#resend-phone-code-btn').text(__('Resend Code'));
            clearInterval(resend_code_countdown_timer_handle);
            return;
        }

        $('#resend-phone-code-btn').text(__('Resend Code') + " " + countdown);
      
      },1000);
  },

  bankdetailspage : function(){
    

    let banks_and_codes_html = '';
    let bank_names_and_codes_string = app_settings.default_banks_and_codes;
    if(bank_names_and_codes_string.trim() != ''){
      let bank_names_and_codes_array = bank_names_and_codes_string.split('|');
    
      if(!!bank_names_and_codes_array){
        bank_names_and_codes_array.forEach(function(val,index){
          let name_and_code_arr = val.split('->');
          banks_and_codes_html += `<option value='${name_and_code_arr[1]}'>${name_and_code_arr[0]}</option>`;
        })
        if(banks_and_codes_html != ''){
          banks_and_codes_html += '<option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>';
          $('#banklist').html(banks_and_codes_html);
        }else{
          $('#banklist').html('<option value="000">-----</option><option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>');
        }
      }else{
        $('#banklist').html('<option value="000">-----</option><option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>');
      }
    }else{
      $('#banklist').html('<option value="000">-----</option><option value="xxx" data-i18nbankdetpg="Other bank...">Other bank...</option>');
    }

    translateElements('bankdetpg');

    if(!!referraldata && referraldata.hasOwnProperty(driver_registration_data.operation_city)){
      let ref_msg = referraldata[driver_registration_data.operation_city].ref_reg_msg;
      $('#ref-code-msg-text').html(ref_msg);
      $('#ref-code-msg').show();
      $('#ref-code-input').show();
    }

  },

  referralspage : function(){
    translateElements('referrals');   
    getreferralsdata();
  },

  promotions: function(){
    translateElements('promotions');   
    promocheck();
  },

  vehicledetailsregpage : function(){
      translateElements('vdetregpg');
      var option_vals = '';

      var city_ids = routetariffs.result.city_id;
      var city_names = routetariffs.result.city_name;
      
      city_ids.forEach(function(value,index){
          option_vals += "<option value='" + value + "' >" + city_names[index] + "</option>"
      });

      $('#cityroute').html(option_vals);

      if(driver_registration_data.operation_city){
        $('#cityroute').find(`option[value=${driver_registration_data.operation_city}]`).prop('selected', true);
      }

      var default_sel_id = $('#cityroute').find(':selected').val();            

      var city_cars =  routetariffs.result[default_sel_id].cars;

      option_vals = '';

      for(var key in city_cars){
          var car_image = city_cars[key].ride_img;
          car_image = siteurl + car_image.substring(2);
          option_vals += "<option data-id='" + city_cars[key].ride_id + "' data-desc='" + city_cars[key].ride_desc + "' data-image='" + car_image + "'>" + city_cars[key].ride_type + "</option>"; 
      }
              
      $('#vehicle-cat').html(option_vals);

      if(driver_registration_data.car_type){
        $('#vehicle-cat').find(`option[data-id=${driver_registration_data.car_type}]`).prop('selected', true);
      }
      
        
      

      var default_sel_image = $('#vehicle-cat').find(':selected').data('image');
      var default_sel_desc = $('#vehicle-cat').find(':selected').data('desc');
      var default_sel_id = $('#vehicle-cat').find(':selected').data('id');
      
      $('#vehicle-image').attr('src',default_sel_image);
      $('#vehicle-desc').html(default_sel_desc);

      $('#vehicle-cat').on('change', function(){
        $('#vehicle-image').attr('src',$(this).find(':selected').data('image'));
        $('#vehicle-desc').html($(this).find(':selected').data('desc'));        
      })


      $('#cityroute').on('change', function(){

        var default_sel_id = $('#cityroute').find(':selected').val(); 

        var city_cars =  routetariffs.result[default_sel_id].cars;

        var option_vals = '';

        for(var key in city_cars){
            var car_image = city_cars[key].ride_img;
            car_image = siteurl + car_image.substring(2);
            option_vals += "<option data-id='" + city_cars[key].ride_id + "' data-desc='" + city_cars[key].ride_desc + "' data-image='" + car_image + "'>" + city_cars[key].ride_type + "</option>";
            
        }
                
        $('#vehicle-cat').html(option_vals);

        var default_sel_image = $('#vehicle-cat').find(':selected').data('image');
        var default_sel_desc = $('#vehicle-cat').find(':selected').data('desc');
        var default_sel_id = $('#vehicle-cat').find(':selected').data('id');
        
        $('#vehicle-image').attr('src',default_sel_image);
        $('#vehicle-desc').html(default_sel_desc);
           
      })


      


     


  }


  
 
};







