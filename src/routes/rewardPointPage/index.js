import { FaRegWindowClose } from 'react-icons/fa';
import style from "./style.module.css";
import { useContext, useState } from 'react';
import ContextRouter from '../../contextRouter';
import RewardPointCompletePage from '../rewardPointCompletePage';

const RewardPointPage = () => {
    const { pop, push } = useContext(ContextRouter);
    const [inputValue, setInputValue] = useState('');

    const handleNumberClick = (number) => {
        // Limit to exactly 13 characters (including hyphens)
        if (inputValue.length < 13) {
            // Insert hyphen after the 3rd and 8th digit
            if ((inputValue.length === 3 || inputValue.length === 8) && inputValue.charAt(inputValue.length - 1) !== '-') {
                setInputValue((prevValue) => prevValue + '-' + number);
            } else {
                setInputValue((prevValue) => prevValue + number);
            }
        }
    };

    const handleBackspaceClick = () => {
        if (inputValue.length === 5 || inputValue.length === 10){
            setInputValue((prevValue) => prevValue.slice(0, -2));
        }else{
            setInputValue((prevValue) => prevValue.slice(0, -1));
        }
        
    };
//test
    const handleRewardClick = () => {
        // Format the phone number and log to the console
        const formattedPhoneNumber = inputValue
        console.log('휴대전화번호:', formattedPhoneNumber);

        // 페이지 이동
        if (inputValue.length<13){
            alert('올바른 전화번호를 입력해주세요')
        }else{
            push(RewardPointCompletePage.name);
        }
        
    };

    return (
        <div className={style.RewardPointPage}>
            <div className={style.RewardPointHeader}>
                <h3 className={style.RewardPointTitle}>휴대전화번호를 눌러주세요.</h3>
                <button className={style.RewardPointClose} onClick={() => pop()}>
                    <FaRegWindowClose size={30} />
                </button>
            </div>
            <div className={style.RewardPointSide}>
                <div className={style.RewardPointBox}>
                    <span className={style.RewardPointHighlight}>100 P</span> 적립
                </div>
                <div className={style.RewardPointBox}>
                    <p>Kakao<b>Talk</b></p>
                    입력하신 휴대전화번호로 매장의 카카오톡 알림톡이 전송 안됩니다.
                </div>
            </div>
            <div className={style.RewardPointBody}>
                <div className={style.RewardPointInput}>
                    <input readOnly value={inputValue} />
                    <p><a>이용약관</a>과 <a>개인정보 취급방침</a>에 동의하시면 휴대전화 번호 입력 후 아래 적립 버튼을 터치하세요.</p>
                </div>
                <div className={style.RewardPointPad}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '←', 0].map((item, index) => (
                        <button className={style.RewardPointPadButton}
                            onClick={() => {
                                if (item === '←') {
                                    handleBackspaceClick();
                                } else {
                                    handleNumberClick(item);
                                }
                            }}
                        > 
                        {item}
                        </button>
                    ))}
                    <button className={style.RewardPointPadButton} onClick={handleRewardClick}>적립</button>
                </div>
            </div>
        </div>
    );
};

export default RewardPointPage;
