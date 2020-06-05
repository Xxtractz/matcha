


  // genderSection() {
  //   return (
  //     <div className="row mb-3">
  //       <div className="col-6 ">
  //         <InputLabel>Gender</InputLabel>
  //         <Select
  //           native
  //           // alue={getUserGender()}
  //           // onChange={handleChange}
  //           // inputProps={{
  //           //   name: "age",
  //           //   id: "age-native-simple",
  //           // }}
  //         >
  //           <option value={"Male"}>Male</option>
  //           <option value={"Other"}>Other</option>
  //           <option value={"Female"}>Female</option>
  //         </Select>
  //       </div>
  //       <div className="col-6 ">
  //         <InputLabel>Preferred Gender</InputLabel>
  //         <Select
  //           native
  //           // value={getUserGenderPreference()}
  //           // onChange={handleChange}
  //           // inputProps={{
  //           //   name: "age",
  //           //   id: "age-native-simple",
  //           // }}
  //         >
  //           <option value={"Male"}>Male</option>
  //           <option value={"Both"}>Both</option>
  //           <option value={"Female"}>Female</option>
  //         </Select>
  //       </div>
  //     </div>
  //   );
  // }

    // removeTag = (i) => {
  //   const newTags = [...this.state.tags];
  //   newTags.splice(i, 1);
  //   this.setState({ tags: newTags });
  // };

  // addTag = () => {
  //   const val = this.state.temptag;
  //   this.tagInput.value = null;
  //   if (val === "") {
  //     return;
  //   }
  //   if (
  //     this.state.tags.find(
  //       (tag) => tag.toString().toLowerCase() === val.toString().toLowerCase()
  //     )
  //   ) {
  //     return;
  //   }
  //   this.setState({ tags: [...this.state.tags, this.state.temptag] });
  // };

  // tagInputChange = (e) => {
  //   this.setState({
  //     temptag: [e.target.value],
  //   });
  // };


    // interestSection() {
  //   const { tags } = this.state;
  //   return (
  //     <div className=" row mb-3">
  //       <div className="col-10    ">
  //         <InputLabel>Interests</InputLabel>
  //         <div className="input-tag">
  //           <ul className="input-tag__tags">
  //             {tags.map((tag, i) => (
  //               <li key={tag}>
  //                 {tag}
  //                 <IconButton
  //                   fontSize="small"
  //                   style={{ padding: "5px" }}
  //                   type="button"
  //                   onClick={() => {
  //                     this.removeTag(i);
  //                   }}
  //                 >
  //                   <CloseIcon fontSize="small" />
  //                 </IconButton>
  //               </li>
  //             ))}
  //             <li className="input-tag__tags__input">
  //               <input
  //                 type="text"
  //                 onChange={this.tagInputChange}
  //                 ref={(c) => {
  //                   this.tagInput = c;
  //                 }}
  //               />
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //       <div className="col-2 pt-3">
  //         <IconButton type="button" onClick={this.addTag} fontSize="large">
  //           <AddCircleIcon fontSize="large" />
  //         </IconButton>
  //       </div>
  //     </div>
  //   );
  // }

    // Form Sections
  // nameSection() {
  //   return (
  //     <div className="row mb-3">
  //       <div className="col-6">
  //         <InputLabel>First Name</InputLabel>
  //         <TextField
  //           className="col-12"
  //           type="text"
  //           name="firstname"
  //           defaultValue={this.state.firstname}
  //           onChange={(e) => this.onChange(e)}
  //           required
  //         />
  //       </div>
  //       <div className="col-6 ">
  //         <InputLabel>Last Name</InputLabel>
  //         <TextField
  //           className="col-12"
  //           type="text"
  //           name="lastname"
  //           defaultValue={this.state.lastname}
  //           onChange={(e) => this.onChange(e)}
  //           required
  //         />
  //       </div>
  //     </div>
  //   );
  // }

//   submitHandler = (e) => {
//     e.preventDefault();

//     // const user = {
//     //   username: this.state.username.toString(),
//     //   password: this.state.password.toString(),
//     // };
//   };


// onChange = (e) => {
//     console.log(e.target.name + ":" + e.target.value);

//     this.setState({
//       [e.target.name]: [e.target.value],
//     });
//   };


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tags: getUserInterest(),
  //     temptag: "",
  //     isopen: true,
  //     firstname: getUserFirstName(),
  //     lastname: getUserLastName(),
  //     gender: getUserGender(),
  //     genderPreference: getUserGenderPreference(),
  //     interest: getUserInterest(),
  //   };
  // }
