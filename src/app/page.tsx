import CommonButton from '@/shared/common/ui/CommonButton';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 gap-5">
			{/* 각자 만든 컴포넌트 불러오기 */}
			{/* <ExampleComponent />  */}
			<CommonButton variant="outlined" size="lg" content="생성하기" />
		</main>
	);
}
