import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import ForgotPasswordForm from './ForgetPassword';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ForgotPasswordForm', () => {
  it('should show success message when email is sent', async () => {
    // Mocking axios post 요청
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        success: true,
        message: '비밀번호 재설정 링크가 전송되었습니다.',
      },
    });

    render(<ForgotPasswordForm />);

    // 이메일 입력 필드를 찾고 값 입력
    const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // "메일 보내기" 버튼을 클릭
    const sendButton = screen.getByText('메일 보내기');
    fireEvent.click(sendButton);

    // 성공 메시지가 화면에 나타나는지 확인
    const successMessage = await screen.findByText(
      '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
    );
    expect(successMessage).toBeInTheDocument();
  });

  it('should show error message when email is invalid', async () => {
    // Mocking axios post 요청 실패 응답
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: { success: false, message: '등록되지 않은 이메일입니다.' },
      },
    });

    render(<ForgotPasswordForm />);

    // 이메일 입력 필드를 찾고 값 입력
    const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });

    // "메일 보내기" 버튼을 클릭
    const sendButton = screen.getByText('메일 보내기');
    fireEvent.click(sendButton);

    // 에러 메시지가 화면에 나타나는지 확인
    const errorMessage = await screen.findByText('등록되지 않은 이메일입니다.');
    expect(errorMessage).toBeInTheDocument();
  });
});
