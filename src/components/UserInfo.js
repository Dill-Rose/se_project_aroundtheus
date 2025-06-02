export default class UserInfo {
  constructor({ nameElement, jobElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }
  setUserInfo(data) {
    if (data.name) {
      this._nameElement.textContent = data.name;
    }

    if (data.about) {
      this._jobElement.textContent = data.about;
    }

    if (data.avatar) {
      this._avatarElement.src = data.avatar;
    }
  }

  updateUserAvavtar(link) {
    this._avatarElement.src = link;
  }
}
