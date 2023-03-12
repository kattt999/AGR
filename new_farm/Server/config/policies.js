/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
   'menu/*': 'WebAuth',
   'configs/*': 'WebAuth',
   'dept/*': 'WebAuth',
   'dict/*': 'WebAuth',
   'dictdata/*': 'WebAuth',
   'post/*': 'WebAuth',
   'role/*': 'WebAuth',
   'user/*': 'WebAuth',
   'device/*': 'WebAuth',
   'devicetype/*': 'WebAuth',
   'sysuser/*': 'WebAuth',
   'dcterminal/*': 'WebAuth' 


   
};
