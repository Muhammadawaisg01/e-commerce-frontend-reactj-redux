
import React, { useState, useEffect } from 'react';
import "../../styles/UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { Navigate, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    // const isUpdated1 = null;
    // loading === false && (
    //     isUpdated1 = { isUpdated } = useSelector((state) => state.profile)
    // )

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {

        e.preventDefault();

        dispatch(updateProfile(name, email));

        // window.location.href = "/account"
        return <Navigate to={"/account"} replace />

    };

    // useEffect(() => {
    //     if (isUpdated?.name) {
    //         setName(isUpdated?.name)
    //     }
    // }, [isUpdated])


    // const updateProfileDataChange = (e) => {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setAvatarPreview(reader.result);
    //             setAvatar(reader.result);
    //         }
    //     }
    //     reader.readAsDataURL(e.target.files[0]);
    // }

    useEffect(() => {
        console.log({ user }, { error }, { isUpdated })
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated successfully");
            dispatch(loadUser());
            // navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [isUpdated, alert, user, error])

    return (
        <>
            {loading ? <Loader /> : (
                <div className='updateProfileContainer'>
                    <div className='updateProfileBox'>
                        <h2 className='updateProfileHeading'>Update Profile</h2>

                        <form
                            className="updateProfileForm"
                            // encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="updateProfileName">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="updateProfileEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                />
                            </div> */}
                            <button type='submit' className='updateProfileBtn'>Update</button>
                            {/* <input type="submit" value="Update" className="updateProfileBtn" /> */}
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdateProfile