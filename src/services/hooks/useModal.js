import { useState } from "react"

export default function UseModal() {
    const [isModalVisible, setModalVisibility] = useState(false)
    const [isModal2Visible, setModal2Visibility] = useState(false)
    const [isModal3Visible, setModal3Visibility] = useState(false)
    function toggleModal() { setModalVisibility(!isModalVisible) }
    function toggleModal2() { setModal2Visibility(!isModal2Visible) }
    function toggleModal3() { setModal3Visibility(!isModal3Visible) }
    return {
        isModalVisible,
        toggleModal,
        isModal2Visible,
        toggleModal2,
        isModal3Visible,
        toggleModal3,
    }
}