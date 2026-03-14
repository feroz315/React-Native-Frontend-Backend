import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';


const ModalInput = () => {
 
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputEmail, setInputEmail] = useState('');


  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setInputText('');
    setInputEmail('');
  };

  const handleSubmit = () => {
    if (inputText.trim() && inputEmail.trim()) {
      Alert.alert('Success!', `Name: ${inputText}\nEmail: ${inputEmail}`);
      hideModal();
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };



  return (
  
    <View style={styles.container}>
      {/* Button to open modal */}
      <TouchableOpacity style={styles.openButton} onPress={showModal}>
        <Text style={styles.buttonText}>Open Input Modal</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Enter Your Details</Text>
              
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={inputText}
                  onChangeText={setInputText}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={inputEmail}
                  onChangeText={setInputEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={hideModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          </View>
      </Modal>
     </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  openButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6C757D',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default ModalInput;





// const ModalUser = ({ visible, onClose, onUpdatePassword }) => {
  
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);


//   const handleUpdatePassword = async () => {
//     // Validation
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'New passwords do not match');
//       return;
//     }

//     if (newPassword.length < 6) {
//       Alert.alert('Error', 'New password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Call your API or auth service here
//       await onUpdatePassword({
//         currentPassword,
//         newPassword,
//       });
      
//       Alert.alert('Success', 'Password updated successfully');
//       onClose();
//       // Reset form
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (error) {
//       Alert.alert('Error', error.message || 'Failed to update password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     onClose();
//     // Reset form when closing
//     setCurrentPassword('');
//     setNewPassword('');
//     setConfirmPassword('');
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={closeModal}
//     >
//       <KeyboardAvoidingView 
//         style={styles.centeredView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <View style={styles.modalView}>
//           <ScrollView 
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             <Text style={styles.modalTitle}>Update Password</Text>
            
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Current Password</Text>
//               <TextInput
//                 style={styles.input}
//                 value={currentPassword}
//                 onChangeText={setCurrentPassword}
//                 secureTextEntry
//                 placeholder="Enter current password"
//                 placeholderTextColor="#999"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>New Password</Text>
//               <TextInput
//                 style={styles.input}
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 secureTextEntry
//                 placeholder="Enter new password"
//                 placeholderTextColor="#999"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Confirm New Password</Text>
//               <TextInput
//                 style={styles.input}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry
//                 placeholder="Confirm new password"
//                 placeholderTextColor="#999"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={[styles.button, styles.cancelButton]}
//                 onPress={closeModal}
//                 disabled={loading}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.button, styles.updateButton, loading && styles.disabledButton]}
//                 onPress={handleUpdatePassword}
//                 disabled={loading}
//               >
//                 <Text style={styles.updateButtonText}>
//                   {loading ? 'Updating...' : 'Update Password'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalView: {
//     width: '90%',
//     maxHeight: '80%',
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 24,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 24,
//     color: '#333',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     fontSize: 16,
//     backgroundColor: '#F9F9F9',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   cancelButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#DEE2E6',
//   },
//   updateButton: {
//     backgroundColor: '#007AFF',
//   },
//   disabledButton: {
//     backgroundColor: '#92C3FD',
//   },
//   cancelButtonText: {
//     color: '#6C757D',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   updateButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default ModalUser;


