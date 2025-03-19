// إدارة المشاريع
class ProjectManager {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.modal = document.getElementById('projectModal');
        this.form = document.getElementById('projectForm');
        this.addButton = document.querySelector('.add-project');
        this.cancelButton = document.querySelector('.cancel');
        
        this.initEventListeners();
        this.renderProjects();
    }

    initEventListeners() {
        this.addButton.addEventListener('click', () => this.openModal());
        this.cancelButton.addEventListener('click', () => this.closeModal());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    openModal() {
        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.form.reset();
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(this.form);
            const projectData = {
                id: this.form.dataset.editId || Date.now(),
                title: formData.get('title'),
                description: formData.get('description'),
                projectUrl: formData.get('projectUrl'),
                githubUrl: formData.get('githubUrl')
            };

            const imageFile = formData.get('image');
            if (imageFile.size > 0) {
                projectData.imageUrl = await this.handleImageUpload(imageFile);
            } else if (this.form.dataset.editId) {
                const existingProject = this.projects.find(p => p.id == this.form.dataset.editId);
                projectData.imageUrl = existingProject.imageUrl;
            }

            // Update projects array
            if (this.form.dataset.editId) {
                this.projects = this.projects.map(p => 
                    p.id == this.form.dataset.editId ? projectData : p
                );
            } else {
                this.projects.push(projectData);
            }

            // Save to localStorage
            localStorage.setItem('projects', JSON.stringify(this.projects));

            // Refresh both dashboard and main page
            this.renderProjects();
            this.updateMainPage();
            this.closeModal();

            // Show success message
            this.showAlert('تم حفظ المشروع بنجاح!', 'success');

        } catch (error) {
            console.error('Error saving project:', error);
            this.showAlert('حدث خطأ أثناء حفظ المشروع', 'error');
        }
    }

    async handleImageUpload(file) {
        // هنا يمكنك إضافة منطق رفع الصور إلى خدمة استضافة
        // حالياً سنقوم بتحويل الصورة إلى Base64 للتخزين المحلي
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
        
        // محاولة تحديث الصفحة الرئيسية بأكثر من طريقة
        try {
            // 1. إرسال حدث للصفحة الرئيسية
            window.opener?.postMessage({
                type: 'projectsUpdated',
                projects: this.projects
            }, '*');

            // 2. تحديث localStorage وإطلاق حدث
            const event = new CustomEvent('projectsUpdated', {
                detail: { projects: this.projects }
            });
            window.dispatchEvent(event);
            
            // 3. تحديث الصفحة الرئيسية مباشرة إذا كانت مفتوحة
            if (window.opener) {
                const mainPageGrid = window.opener.document.querySelector('.projects-grid');
                if (mainPageGrid) {
                    this.updateMainPageProjects(mainPageGrid);
                }
            }
        } catch (error) {
            console.log('سيتم تحديث المشاريع عند تحديث الصفحة الرئيسية');
        }
    }

    updateMainPageProjects(mainPageGrid) {
        if (this.projects.length === 0) {
            mainPageGrid.innerHTML = `
                <div class="empty-projects">
                    <i class="fas fa-folder-open"></i>
                    <p>لا توجد مشاريع حالياً</p>
                    <span>سيتم إضافة المشاريع قريباً</span>
                </div>
            `;
        } else {
            mainPageGrid.innerHTML = this.projects.map(project => `
                <div class="project-card" data-aos="fade-up">
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-actions">
                        <a href="${project.projectUrl}" target="_blank" class="btn">
                            <i class="fas fa-external-link-alt"></i> معاينة
                        </a>
                        <a href="${project.githubUrl}" target="_blank" class="btn">
                            <i class="fab fa-github"></i> المصدر
                        </a>
                    </div>
                </div>
            `).join('');
        }
    }

    updateMainPage() {
        // تحديث الصفحة الرئيسية بعدة طرق
        try {
            // 1. تحديث localStorage
            localStorage.setItem('projectsUpdated', Date.now());

            // 2. إرسال رسالة للصفحة الرئيسية
            if (window.opener) {
                window.opener.postMessage({ type: 'refreshProjects' }, '*');
            }

            // 3. تحديث من خلال LocalStorage event
            window.dispatchEvent(new Event('storage'));

        } catch (error) {
            console.error('Error updating main page:', error);
        }
    }

    showAlert(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        const container = document.querySelector('.content');
        container.insertBefore(alert, container.firstChild);
        
        setTimeout(() => alert.remove(), 3000);
    }

    deleteProject(id) {
        if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
            try {
                // حذف المشروع من المصفوفة
                this.projects = this.projects.filter(p => p.id != id);
                
                // تحديث localStorage
                localStorage.setItem('projects', JSON.stringify(this.projects));
                
                // تحديث العرض في الداشبورد
                this.renderProjects();
                
                // تحديث الصفحة الرئيسية
                if (window.opener) {
                    window.opener.postMessage({ type: 'projectsUpdated' }, '*');
                    window.opener.location.reload();
                }

                this.showAlert('تم حذف المشروع بنجاح', 'success');
            } catch (error) {
                console.error('Error deleting project:', error);
                this.showAlert('حدث خطأ أثناء حذف المشروع', 'error');
            }
        }
    }

    renderProjects() {
        const container = document.querySelector('.projects-grid');
        
        if (!this.projects.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h3>لا توجد مشاريع</h3>
                    <p>ابدأ بإضافة مشروعك الأول!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.projects.map(project => `
            <div class="project-card" data-id="${project.id}">
                <img src="${project.imageUrl}" alt="${project.title}" loading="lazy">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-actions">
                    <a href="${project.projectUrl}" target="_blank" class="view-btn" title="معاينة">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${project.githubUrl}" target="_blank" class="github-btn" title="المصدر">
                        <i class="fab fa-github"></i>
                    </a>
                    <button class="edit-btn" data-id="${project.id}" title="تعديل">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${project.id}" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // إضافة مستمعي الأحداث للأزرار
        this.addButtonListeners();
    }

    addButtonListeners() {
        // إضافة مستمعي أحداث للأزرار
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.deleteProject(id);
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.editProject(id);
            });
        });
    }

    editProject(id) {
        const project = this.projects.find(p => p.id === id);
        if (!project) return;

        // Fill form with project data
        Object.keys(project).forEach(key => {
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input && key !== 'imageUrl') {
                input.value = project[key];
            }
        });

        // Add edit mode flag
        this.form.dataset.editId = id;
        this.openModal();
    }

    deleteProject(id) {
        if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
            this.projects = this.projects.filter(p => p.id !== id);
            this.saveProjects();
            this.renderProjects();
        }
    }
}

// تهيئة مدير المشاريع مع إضافة تأثيرات حركية
document.addEventListener('DOMContentLoaded', () => {
    window.projectManager = new ProjectManager();
    
    // Add animation library
    AOS.init({
        duration: 800,
        once: true
    });
});
