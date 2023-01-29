import { Button, Toast } from 'antd-mobile'
export default function App() {
    return (
        <div className="">
            <Button
                type="primary"
                onClick={() => Toast.success('Load success !!!', 1)}
            >
                default disabled
            </Button>
            <Button color='red' fill='solid'>
                Solid
            </Button>
        </div>
    )
}
