const mockSuccessApi = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res('Success');
    }, 5000)
  })
}

export default mockSuccessApi;