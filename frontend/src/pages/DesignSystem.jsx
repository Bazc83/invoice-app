import { Button } from '@/components/Button';
import styles from '@styles/DesignSystem.module.css';
export const DesignSystem = () => {
  return (
    <div>
      <h1>Text</h1>
      <br />
      <h1>Aliquam porttitor mauris sit amet orci Aenean</h1>
      <h2>Aliquam porttitor mauris sit amet orci Aenean</h2>
      <h3>Aliquam porttitor mauris sit amet orci Aenean</h3>
      <h4>Aliquam porttitor mauris sit amet orci Aenean</h4>

      <p className='text'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
        vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu
        nibh.
      </p>
      <br />
      <p className='text-sm'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
        hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet
        vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
        laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu
        nibh.
      </p>

      <br />

      <h1>Buttons</h1>
      <p className='text'>Button default</p>

      <div className={styles.btnWrapper}>
        <Button plusIcon> New</Button>
        <Button>New</Button>

        <Button btnStyle='btnThree'>Edit</Button>

        <Button btnStyle='btnFour'>Save as Draft</Button>

        <Button btnStyle='btnFive'>Delete</Button>

        <Button btnStyle='btnSix'>+ Delete</Button>
      </div>
    </div>
  );
};
