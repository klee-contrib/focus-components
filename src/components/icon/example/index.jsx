import Icon from 'focus-components/components/icon';

function IconsExample() {
    return (
        <div>
            <h4>Material design library</h4>
            <Icon name='dashboard' onClick={() => { console.log('Hello material icon dashboard !') }} />
            <Icon name='settings' onClick={() => { console.log('Hello material icon settings !') }} />
            <Icon name='favorite' onClick={() => { console.log('Hello material icon favorite !') }} />
            <Icon name='fingerprint' onClick={() => { console.log('Hello material icon fingerprint !') }} />
            <Icon name='face' onClick={() => { console.log('Hello material icon face !') }} />
            <br />
            <h4>Font-Awesome library</h4>
            <Icon library='font-awesome' name='hashtag' onClick={() => { console.log('Hello font-awesome icon hashtag !') }} /> <Icon library='font-awesome' name='bars' onClick={() => { console.log('Hello font-awesome icon bars !') }} /> <Icon library='font-awesome' name='laptop' onClick={() => { console.log('Hello font-awesome icon laptop !') }} /> <Icon library='font-awesome' name='map' onClick={() => { console.log('Hello font-awesome icon map !') }} />   <Icon library='font-awesome' name='youtube-play' onClick={() => { console.log('Hello font-awesome icon youtube-play !') }} />
            <br />
        </div>
    );
}

export default IconsExample;
